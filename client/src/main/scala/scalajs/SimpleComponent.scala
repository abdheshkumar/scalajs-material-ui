package scalajs
import japgolly.scalajs.react.vdom.TagOf
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, Callback, PropsChildren, ReactEvent, ScalaComponent}
import org.scalajs.dom
import org.scalajs.dom.html.Div
import reactjs.Button

import scala.scalajs.js

object SimpleComponent {

  val stateComponent = ScalaComponent.builder[Props]("StateComponent")
    .initialState(State("This is state"))
    .renderBackendWithChildren[Backend]
    .build

  val childProps = HigherOrderComponent.Props(theme => {
    dom.console.log(theme)
    js.Dynamic.literal("root" -> js.Dynamic.literal("backgroundColor" -> "red"))
  }, js.Dynamic.literal("name" -> "SimpleComponent"))

  def apply(props: Props): VdomElement = HigherOrderComponent(stateComponent)(props)(childProps)

  case class Props(name: String) {

  }

  case class State(name: String)

  case class Backend($: BackendScope[Props, State]) {
    def render(props: Props, S: State, children: PropsChildren): TagOf[Div] = {
      <.div(
        ^.className := "root",
        props.name,
        S.name,
        children,
        Button(className = "root", onClick = onclick, color = "primary")("Button")
      )
    }

    def onclick: ReactEvent => Callback = { event =>
      $.modState {
        s =>
          s.copy(name = "Change state")
      }
    }
  }

}
