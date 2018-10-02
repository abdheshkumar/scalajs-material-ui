package outer

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import pages.{InnerPage1, OuterPage, Page}
import reactjs.{TestClass, Welcome}

object Page1Component {

  final case class Props(ctrl: RouterCtl[Page]) {
    @inline def render: VdomElement = Component(this)
  }

  case class State(data: TestClass)

  final class Backend($: BackendScope[Props, State]) {

    def updateField(data: TestClass): Callback = $.modState(s => s.copy(data = data))

    def render(p: Props, state: State): VdomElement = {
     println(s"State:: ${state.data}")
      <.div(
        "Page1",
        <.a(
          ^.href := "",
          "Go to InnerPage1",
          ^.onClick --> p.ctrl.set(OuterPage(InnerPage1))
        ),
        Welcome("Abdhesh, From ScalaJs component",
          state.data,
          updateField
        )
      )
    }
  }

  private val Component = ScalaComponent.builder[Props]("Page1Component")
    .initialState(State(TestClass("", "")))
    .renderBackend[Backend]
    .build

  def apply(ctrl: RouterCtl[Page]): Props = Props(ctrl)
}