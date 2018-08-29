package scalajs
import japgolly.scalajs.react.component.Js._
import japgolly.scalajs.react.internal.Box
import japgolly.scalajs.react.{Children, CtorType, ScalaComponent}
import reactjs.WithStyles
import reactjs.theme.MuiRawTheme
import japgolly.scalajs.react
import japgolly.scalajs.react.{Children => ChildrenType}
import scala.scalajs.js

object HigherOrderComponent {

  case class Props(styles: js.Function1[MuiRawTheme, js.Object],
                   options: js.Object)

  def apply[P, Ctor[-p, +u] <: CtorType[p, u], Children <: ChildrenType](
    wrappedComponent: ScalaComponent[P, _, _, Ctor]
  )(props: P)(
    childProps: Props
  ): UnmountedWithRawType[js.Object, js.Object, RawMounted] = {
    val jsProps = Box(props)
    val component = react.JsComponent[js.Object, Children.Varargs, js.Object](
      WithStyles(childProps.styles, childProps.options, wrappedComponent.raw)
    )
    component(jsProps)()
  }
}
