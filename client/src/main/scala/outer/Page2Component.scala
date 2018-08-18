package outer

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import pages.{InnerPage1, InnerPage2, OuterPage, Page}

object Page2Component {

  final case class Props(ctrl: RouterCtl[Page]) {
    @inline def render: VdomElement = Component(this)
  }


  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        "Page2",
        <.a(
          ^.href := "",
          "Go to InnerPage2",
          ^.onClick --> p.ctrl.set(OuterPage(InnerPage2("anyquery")))
        )
      )
  }

  private val Component = ScalaComponent.builder[Props]("Page2Component")
    .renderBackend[Backend]
    .build

  def apply(ctrl: RouterCtl[Page]): Props = Props(ctrl)

}