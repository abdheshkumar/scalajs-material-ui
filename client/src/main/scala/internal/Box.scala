package internal

import scala.scalajs.js
import scala.scalajs.js.annotation.JSName

@js.native
trait Box[+A, C] extends js.Object {
  @JSName("a") val unbox: A = js.native
  @JSName("classes") val classes: js.Any = js.native

}

object Box {
  @inline def apply[A, C](value: A, classes: js.Any): Box[A, C] =
    js.Dynamic.literal(a = value.asInstanceOf[js.Any], classes = classes).asInstanceOf[Box[A, C]]

  @inline def apply[A, C](value: A): Box[A, C] =
    js.Dynamic.literal(a = value.asInstanceOf[js.Any]).asInstanceOf[Box[A, C]]

}

