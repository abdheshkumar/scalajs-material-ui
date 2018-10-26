import japgolly.scalajs.react.extra.router.{BaseUrl, Router}
import ngage.JSWriterGenerator
import pages.Page
import reactjs.TestClass

object TutorialApp extends JSWriterGenerator {

  def main(args: Array[String]): Unit = {
    import org.scalajs.dom

    val writer = jsWriter[TestClass]
    org.scalajs.dom.console.log(writer.toJs(TestClass("User name", "last name")))
    val baseUrl = BaseUrl.fromWindowOrigin / "pages" / "scalajs-material-ui/"
    val router: Router[Page] = Router(baseUrl, Page.routes.logToConsole)
    router().renderIntoDOM(dom.document.getElementById("playground"))
  }


}