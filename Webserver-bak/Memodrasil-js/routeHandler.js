const fs = require("fs").promises
const templatePath = "./templates/index.maru"

exports.handleRoute = async function (pathSegments, request, response) {
   function statusCodeResponse(code, value, type) {
      response.writeHead(code, { 'Content-Type': `${type}` })
      response.write(value)
      response.end()
   }

   if (pathSegments.length === 0) {
      let template = (await fs.readFile(templatePath)).toString()
      statusCodeResponse(200, template, "text/html")
      return
   }

   let seg = pathSegments.shift()
   switch (seg) {
      case "game":
         profileHandler.handleGameRoute(pathSegments, request, response)
         break
      default:
         statusCodeResponse(404, "404 Not Found", "text/plain")
         break
   }
}