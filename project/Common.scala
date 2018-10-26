import org.scalajs.sbtplugin.ScalaJSPlugin.AutoImport._
import sbt.Keys._
import sbt._

object Common {
  val installNpm = taskKey[Int]("Install npm dependencies.")

  val buildSettings = Seq(
    installNpm := {
      scala.sys.process.Process("npm install", baseDirectory.value).run().exitValue()
    },
    scalaJSUseMainModuleInitializer := true,
    // Uniformises fastOptJS/fullOptJS output file name
    artifactPath in(Compile, fastOptJS) := ((crossTarget in(Compile, fastOptJS)).value / "app.js"),
    artifactPath in(Compile, packageJSDependencies) := ((crossTarget in(Compile, fastOptJS)).value / "deps.js"),
    artifactPath in(Test, fastOptJS) := ((crossTarget in(Test, fastOptJS)).value / "app.test.js"),
    artifactPath in(Test, packageJSDependencies) := ((crossTarget in(Test, fastOptJS)).value / "deps.test.js"),
    artifactPath in(Compile, fullOptJS) := ((crossTarget in(Compile, fullOptJS)).value / "app.min.js"),
    artifactPath in(Compile, packageMinifiedJSDependencies) := ((crossTarget in(Compile, fullOptJS)).value / "deps.min.js"),
    artifactPath in(Test, fullOptJS) := ((crossTarget in(Test, fullOptJS)).value / "app.min.test.js"),
    artifactPath in(Test, packageMinifiedJSDependencies) := ((crossTarget in(Test, fullOptJS)).value / "deps.min.test.js")
  ) ++
    // Specifies where to store the outputs of Scala.js compilation.
    Seq(fastOptJS, packageJSDependencies)
      .map(task => crossTarget in(Compile, task) := file("ui/apps/" + (moduleName in fastOptJS).value)) ++
    Seq(fullOptJS, fastOptJS, packageJSDependencies, scalaJSUseMainModuleInitializer, packageMinifiedJSDependencies)
      .map(task => crossTarget in(Test, task) := file("ui/apps/" + (moduleName in fastOptJS).value))
}
