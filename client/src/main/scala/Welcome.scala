import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.extra._

object Welcome {

  final case class Props(name: String) {
    @inline def render: VdomElement = Component(this)
  }

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(s"Welcome, ${p.name}")
  }

  val Component = ScalaComponent.builder[Props]("Welcome")
    .renderBackend[Backend]
    .build

  def apply(name: String): VdomElement = Component(Props(name))
}