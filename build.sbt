import sbt.Keys.version
import Dependencies._
import scala.sys.process.Process

val root = Project("root", file("."))

val server = Project("server", file("server"))
  .settings(
    name := "Server",
    version := "0.1",
    scalaVersion := "2.12.7",
    organizationName := "abtechsoft.com",
    libraryDependencies ++= akkHttp.value)

val core = (project in file("core"))
  .settings(
    organization := "com.payalabs",
    name := "core",
    crossScalaVersions := Seq("2.12.2", "2.11.12"),
    scalaVersion := crossScalaVersions.value.head,
    scalacOptions := Seq("-unchecked", "-deprecation", "-feature"),
    libraryDependencies ++= {
      val scalaJsDomV = "0.9.3"
      val scalaJsReactV = "1.2.0"
      val scalatestV = "3.0.1"
      Seq(
        "org.scala-lang" % "scala-reflect" % scalaVersion.value % Provided,
        "org.scala-js" %%% "scalajs-dom" % scalaJsDomV % Provided,
        "com.github.japgolly.scalajs-react" %%% "core" % scalaJsReactV % Provided,
        "org.scalatest" %%% "scalatest" % scalatestV % Test,
        "com.github.japgolly.scalajs-react" %%% "test" % scalaJsReactV % Test,
        "org.scalameta" %% "scalameta" % "4.0.0"
      ) ++ scalaJsReactBridge.value
    }
  ).enablePlugins(ScalaJSPlugin)

val client = Project("client", file("client"))
  .settings(
    name := "scalajs-material-ui",
    version := "0.1",
    scalaVersion := "2.12.6",
    organizationName := "abtechsoft.com",
    scalaJSUseMainModuleInitializer := true,
    libraryDependencies ++=
      autoWire.value ++
        scalaJsReact.value ++
        scalaCss.value ++
        scalaCssReact.value ++
        scalaJsdiode.value ++
        scalaJsdom.value ++
        scalaJsReactBridge.value
  )
  .settings(Common.buildSettings: _*)
  .settings(
    dependencyOverrides += "org.webjars.npm" % "js-tokens" % "3.0.2",
    npmDependencies in Compile ++= Seq(
      "react" -> "16.5.1",
      "react-dom" -> "16.5.1"
    ),
    emitSourceMaps in(Compile, fullOptJS) := false,
    fullOptJS in Compile := {
      val srcRoot = baseDirectory.value.getParentFile
      Process("npm run build-prod", baseDirectory.value).run.exitValue()
      val js = (fullOptJS in Compile).value
      //(Process("java -jar " + (srcRoot / "_utils/google-closure/compiler.jar").getAbsolutePath + " --js " + (baseDirectory.value / "target/scala-2.12/combined.js") + " --compilation_level ADVANCED --jscomp_off=checkVars --js_output_file " + (srcRoot / "ui/apps/scalajs-material-ui/all.min.js").getAbsolutePath, baseDirectory.value)).run().exitValue()
      js
    },
    fastOptJS in Compile := {
      val js = (fastOptJS in Compile).value
      //scala.sys.process.Process("npm run build-dev", baseDirectory.value).run().exitValue()
      js
    }
  )
  .dependsOn(core)
  .enablePlugins(ScalaJSPlugin)
  .enablePlugins(ScalaJSBundlerPlugin)


        