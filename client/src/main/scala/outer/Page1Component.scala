package outer

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import pages.{InnerPage1, OuterPage, Page}

object Page1Component {

  final case class Props(ctrl: RouterCtl[Page]) {
    @inline def render: VdomElement = Component(this)
  }

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        "Page1",
        <.a(
          ^.href := "",
          "Go to InnerPage1",
          ^.onClick --> p.ctrl.set(OuterPage(InnerPage1))
        )
      )
  }

  private val Component = ScalaComponent.builder[Props]("Page1Component")
    .renderBackend[Backend]
    .build

  def apply(ctrl: RouterCtl[Page]): Props = Props(ctrl)
}