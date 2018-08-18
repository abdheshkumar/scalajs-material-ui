package inner

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import pages.{InnerPage, InnerToOuterPage, Page2}

object InnerPage1Component {

  final case class Props(ctrl: RouterCtl[InnerPage]) {
    @inline def render: VdomElement = Component(this)
  }

  //implicit val reusabilityProps: Reusability[Props] =
  //  Reusability.derive

  final class Backend($: BackendScope[Props, Unit]) {
    def onClick(props: Props): Callback =
      props.ctrl.set(InnerToOuterPage(Page2))

    def render(p: Props): VdomElement = {
      <.div("InnerPage1",
        <.a(
          ^.href := "",
          "Go To Page2",
          ^.onClick --> onClick(p)))
    }
  }

  private val Component = ScalaComponent.builder[Props]("InnerPage1Component")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build

  def apply(ctrl: RouterCtl[InnerPage]): Props = Props(ctrl)
}
