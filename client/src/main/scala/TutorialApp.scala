import org.scalajs.dom

object TutorialApp {
  def main(args: Array[String]): Unit = {
    SimpleComponent(SimpleComponent.Props("Simple Name")).renderIntoDOM(dom.document.getElementById("playground"))
  }


}