const server = require("http")
const routes = require("./routes")


const serverObject = server.createServer(routes.handler)
serverObject.listen(3000)
console.log("Listening on Port 3000")
//routes.read("login")