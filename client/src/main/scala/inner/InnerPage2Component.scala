package inner

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import pages.{InnerPage, InnerToOuterPage, Page1, Page2}

object InnerPage2Component {

  final case class Props(ctrl: RouterCtl[InnerPage]) {
    @inline def render: VdomElement = Component(this)
  }

  final class Backend($: BackendScope[Props, Unit]) {
    def onClick(props: Props): Callback =
      props.ctrl.set(InnerToOuterPage(Page1))

    def render(p: Props): VdomElement =
      <.div("InnerPage2",
        <.a(
          ^.href := "",
          "Go To Page1",
          ^.onClick --> onClick(p)))
  }

  private val Component = ScalaComponent.builder[Props]("InnerPage2Component")
    .renderBackend[Backend]
    .build

  def apply(ctrl: RouterCtl[InnerPage]): Props = Props(ctrl)
}