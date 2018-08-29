
###This project is sample project structure to guide you, how to use scalajs,material-ui and react component facade and write react component in scalajs.
####This project is categorized in three sections.
1. **server** : It is akka-http based server. it's responsibility to server static content like css and scalajs compiled javascript file. If you want, you can any other server instead of akka-http. I love akka toolkit that's why I used akka-http server.

2. **client** : It is scalajs based project. This project contains scalajs code, React component in ScalaJs, React Routes in scalajs and react facade. In this project, I also explained how to use nested routes in scalajs by very nice and clean way. *installNpm* sbt task used to install any npm dependencies from sbt instead of running *npm install* separately

3. **ui** : It is not sbt based project. It is npm based project that contains react based components. I wrote facade for react based component in scalajs.

####How to run this project?
#####Start asset server
1. Open terminal 
2. sbt "project server" run  
   It will start server on http://127.0.0.1:8063

#####Compile react components
1. Open terminal
2. cd ui/users-app
3. npm install (It will install all package.json dependencies)

#####ScalaJs project
1. Open terminal 
2. sbt
3. project client
4. installNpm task on sbt
5. fastOptJS (The compiled code will be moved to ui/apps/scalajs-material-ui)

#####Access project
1. Open browser
2. Enter http://localhost:8063/pages/scalajs-material-ui/


The good thing about this project structure, UI team can write react components in *ui/users-app* directory without disturbing Scala team. 