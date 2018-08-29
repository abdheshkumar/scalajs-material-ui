package scalajs
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object App {

  final case class Props(childComponent: VdomElement) {
    @inline def render: VdomElement = Component(this)
  }

  final class Backend($ : BackendScope[Props, Unit]) {
    def render(props: Props): VdomElement = props.childComponent
  }

  private val Component = ScalaComponent
    .builder[Props]("App")
    .renderBackend[Backend]
    .build

  def apply(childComponent: VdomElement): VdomElement =
    Props(childComponent).render

}
