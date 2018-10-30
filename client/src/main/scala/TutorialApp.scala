

object TutorialApp {

  def main(args: Array[String]): Unit = {
    import org.scalajs.dom
   /* val baseUrl = BaseUrl.fromWindowOrigin / "pages" / "scalajs-material-ui/"
    val router: Router[Page] = Router(baseUrl, Page.routes.logToConsole)
    router().renderIntoDOM(dom.document.getElementById("playground"))*/
    Welcome("Hello").renderIntoDOM(dom.document.getElementById("playground"))
    dom.console.log("Hello")
  }


}