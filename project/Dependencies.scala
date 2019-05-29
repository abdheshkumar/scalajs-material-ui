import org.portablescala.sbtplatformdeps.PlatformDepsPlugin.autoImport._
import sbt._

object Dependencies {

  val akkHttp = Def.setting(Seq(
    "com.typesafe.akka" %% "akka-http" % "10.0.11",
    "com.typesafe.akka" %% "akka-http-testkit" % "10.0.11" % Test
  ))
  val autoWire = Def.setting(Seq(
    "com.lihaoyi" %%% "autowire" % Versions.autowire
  ))

  val scalaJsReact = Def.setting(Seq(
    "com.github.japgolly.scalajs-react" %%% "core" % Versions.scalaJs.react,
    "com.github.japgolly.scalajs-react" %%% "extra" % Versions.scalaJs.react,
    "com.github.japgolly.scalajs-react" %%% "test" % Versions.scalaJs.react % "test"
  ))

  val scalaJsReactMaterialUI = Def.setting(Seq(
    "com.olvind" %%% "scalajs-react-components" % "0.8.0"
  ))


  val scalaCss = Def.setting(Seq(
    "com.github.japgolly.scalacss" %%% "core" % Versions.scalaCSS
  ))


  val scalaCssReact = Def.setting(Seq(
    "com.github.japgolly.scalacss" %%% "ext-react" % Versions.scalaCSS
  ))

  val scalaJsdiode = Def.setting(Seq(
    "io.suzaku" %%% "diode" % Versions.scalaJs.diode,
    "io.suzaku" %%% "diode-react" % Versions.scalaJs.diodeReact
  ))

  val scalaTags = Def.setting(Seq(
    "com.lihaoyi" %%% "scalatags" % "0.6.3"
  ))

  val scalaJsdom = Def.setting(Seq(
    "org.scala-js" %%% "scalajs-dom" % Versions.scalaJs.dom
  ))

  val scalaJsReactBridge = Def.setting(Seq(
    "com.payalabs" %%% "scalajs-react-bridge" % Versions.scalaJs.bridge
  ))
}
