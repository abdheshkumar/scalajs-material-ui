import sbt.Keys.version
import Dependencies._

val root = Project("root", file("."))

val server = Project("server", file("server"))
  .settings(
    name := "Server",
    version := "0.1",
    scalaVersion := "2.12.8",
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
      val scalaJsReactV = "1.4.2"
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
    scalaVersion := "2.12.8",
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
    emitSourceMaps in(Compile, fullOptJS) := false,
    fullOptJS in Compile := {
      val srcRoot = baseDirectory.value.getParentFile.getParentFile
      val js = (fullOptJS in Compile).value
      //Process("npm run build-prod", baseDirectory.value).#&&(Process("java -jar " + (srcRoot / "_utils/google-closure/compiler.jar").getAbsolutePath + " --js " + (baseDirectory.value / "target/scala-2.12/combined.js") + " --compilation_level SIMPLE --js_output_file " + (srcRoot / "web_servers/static/apps/service-management-app/all.min.js").getAbsolutePath, baseDirectory.value)).run()
      js
    },
    fastOptJS in Compile := {
      val js = (fastOptJS in Compile).value
      scala.sys.process.Process("npm run build-dev", baseDirectory.value).run().exitValue()
      js
    }
  )
  .dependsOn(core)
  .enablePlugins(ScalaJSPlugin)


        