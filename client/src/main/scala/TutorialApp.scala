import japgolly.scalajs.react.extra.router.{BaseUrl, Router}
import org.scalajs.dom
import pages.Page

object TutorialApp {
  def main(args: Array[String]): Unit = {
    val baseUrl = BaseUrl.fromWindowOrigin / "pages" / "scalajs-material-ui/"
    Router(baseUrl, Page.routes)()
      .renderIntoDOM(dom.document.getElementById("playground"))
  }


}