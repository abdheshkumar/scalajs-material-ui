import sbt.Keys.version
import Dependencies._

val root = Project("root", file("."))

val server = Project("server", file("server"))
  .settings(
    name := "Server",
    version := "0.1",
    scalaVersion := "2.12.3",
    organizationName := "abtechsoft.com",
    libraryDependencies ++= akkHttp.value)

val client = Project("client", file("client"))
  .settings(
    name := "scalajs-material-ui",
    version := "0.1",
    scalaVersion := "2.12.3",
    organizationName := "abtechsoft.com",
    scalaJSUseMainModuleInitializer := true,
    libraryDependencies ++=
      autoWire.value ++
        scalaJsReact.value ++
        scalaCss.value ++
        scalaCssReact.value ++
        scalaJsdiode.value ++
        scalaJsdom.value ++
        scalaJsReactBridge.value ++
        scalaJsReactMaterialUI.value
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
      Process("npm run build-dev", baseDirectory.value).run().exitValue()
      js
    }
  ).enablePlugins(ScalaJSPlugin)


        