import java.nio.file.{Files, NoSuchFileException, Path}

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.StatusCodes._
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.{Route, _}
import akka.stream.ActorMaterializer
import com.typesafe.config.{Config, ConfigFactory}

import scala.concurrent.ExecutionContextExecutor

object AssetServer extends App {

  val config: Config = ConfigFactory.load

  implicit val system: ActorSystem = ActorSystem("assets", config)
  implicit val materializer: ActorMaterializer = ActorMaterializer()
  implicit val ec: ExecutionContextExecutor = system.dispatcher

  implicit def myRejectionHandler: RejectionHandler = {
    RejectionHandler
      .newBuilder()
      .handle {
        case MissingCookieRejection(cookieName) =>
          complete(
            HttpResponse(BadRequest, entity = "No cookies, no service!!!")
          )
      }
      .handle {
        case AuthorizationFailedRejection =>
          complete(Forbidden, "You're out of your depth!")
      }
      .handle {
        case ValidationRejection(msg, _) =>
          complete(InternalServerError, "That wasn't valid! " + msg)
      }
      .handleAll[Rejection] { _ =>
        complete(MethodNotAllowed, s"Can't do that! Supported!")
      }
      .handleNotFound {
        complete(NotFound, "Not here!")
      }
      .result()
  }

  private val fileHandler = handleExceptions(ExceptionHandler {
    case _: NoSuchFileException =>
      complete(
        HttpResponse(
          status = StatusCodes.InternalServerError,
          entity =
            HttpEntity(ContentTypes.`text/plain(UTF-8)`, "File Not Found")
        )
      )
  })

  def getPath(path: String): Path = java.nio.file.Paths.get(path).toAbsolutePath

  private[this] val static_base = config.getString("baseDirectory")

  private val javascriptRoute: Route = path("js" / Segment / Segment) {
    (module, path) =>
      encodeResponse {
        val resourcePath = s"$static_base/apps/$module/$path"
        fileHandler {
          complete(
            HttpEntity(
              MediaTypes.`application/javascript` withCharset HttpCharsets.`UTF-8`,
              Files.readAllBytes(getPath(resourcePath))
            )
          )
        }
      }
  }

  private val cssRoute: Route = path("css" / Segment / Segment) {
    (module, path) =>
      encodeResponse {
        val resourcePath = s"$static_base/apps/$module/$path"
        fileHandler {
          complete(
            HttpEntity(
              MediaTypes.`text/css` withCharset HttpCharsets.`UTF-8`,
              Files.readAllBytes(getPath(resourcePath))
            )
          )
        }
      }
  }

  private val staticPagesRoute: Route = pathPrefix("pages") {
    pathPrefix(Segment) { module =>
      path(Segments) { absUrl =>
        pathEndOrSingleSlash {
          val resourcePath = s"$static_base/apps/$module/index.html"
          complete(
            HttpEntity(
              ContentTypes.`text/html(UTF-8)`,
              Files.readAllBytes(getPath(resourcePath))
            )
          )
        }
      }
    }
  }

  val route: Route = staticPagesRoute ~ javascriptRoute ~ cssRoute

  val host = config.getString("host.ip")
  val httpPort = config.getInt("host.ports.http")

  /** Bind server for http request */
  val bindingHttp = Http()
    .bindAndHandle(route, host, httpPort)
    .map { f =>
      println(s"Server running on ${f.localAddress}")
      f
    }

  sys.addShutdownHook(new Thread() {
    override def run() {
      val result = for {
        _ <- bindingHttp.flatMap(_.unbind())
      } yield ()
      result.onComplete { _ =>
        system.terminate()
        materializer.shutdown()
      }
    }
  })

}
