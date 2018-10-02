import japgolly.scalajs.react.extra.router.{BaseUrl, Router}
import ngage.JSWriterGenerator
import org.scalajs.dom
import pages.Page
import reactjs.TestClass

object TutorialApp extends JSWriterGenerator {

  def main(args: Array[String]): Unit = {

    val writer = jsWriter[TestClass]
    org.scalajs.dom.console.log(writer.toJs(TestClass("User name", "last name")))
    val baseUrl = BaseUrl.fromWindowOrigin / "pages" / "scalajs-material-ui/"
    Router(baseUrl, Page.routes)()
      .renderIntoDOM(dom.document.getElementById("playground"))
  }


}