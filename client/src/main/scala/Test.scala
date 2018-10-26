import japgolly.scalajs.react.vdom.TagOf
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}
import org.scalajs.dom.html.Div

object SimpleComponent {

  case class Props(name: String)
  case class State(name: String)

  case class Backend($: BackendScope[Props, Unit]) {
    def render(props: Props): TagOf[Div] = {

      <.div(
        ^.className := "root",
        props.name,
        SimpleComponent1()
      )
    }


  }

  private val Component = ScalaComponent
    .builder[Props]("App")
    .renderBackend[Backend]
    .build

  def apply(): VdomElement =
    Component(Props(""))

}


object SimpleComponent1 {

  case class Props(name: String)
  case class State(name: String)

  case class Backend($: BackendScope[Props, Unit]) {
    def render(props: Props): TagOf[Div] = {
      <.div(
        ^.className := "root",
        props.name
      )
    }


  }

  private val Component = ScalaComponent
    .builder[Props]("App")
    .renderBackend[Backend]
    .build

  def apply(): VdomElement =
    Component(Props(""))

}
