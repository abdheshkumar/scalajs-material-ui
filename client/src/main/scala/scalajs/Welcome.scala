package scalajs

import com.payalabs.scalajs.react.bridge.{ReactBridgeComponent, WithProps}

object Welcome extends ReactBridgeComponent {
  override lazy val componentNamespace: String = "react_ui"

  def apply(name: String): WithProps = auto
}
