import japgolly.scalajs.react.extra.router.{BaseUrl, Router}
import ngage.JSWriterGenerator
import org.scalajs.dom
import pages.Page

object TutorialApp extends JSWriterGenerator {

  case class TestClass(firstName: String) {
    def withFirstName(v: String): TestClass = copy(firstName = v)
  }

  def main(args: Array[String]): Unit = {

    val writer = jsWriter[TestClass]
    org.scalajs.dom.console.log(writer.toJs(TestClass("User name")))
    val baseUrl = BaseUrl.fromWindowOrigin / "pages" / "scalajs-material-ui/"
    Router(baseUrl, Page.routes)()
      .renderIntoDOM(dom.document.getElementById("playground"))
  }


}