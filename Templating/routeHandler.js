const fs = require("fs").promises;
const templatePath = "./templates/index.maru";
const gameHandler = require("./routeHandlers/gameHandler");
const fileHandler = require("./fileHandler");

exports.handleRoute = async function (pathSegments, request, response) {
   function statusCodeResponse(code, value, type) {
      response.writeHead(code, { 'Content-Type': `${type}` });
      response.write(value);
      response.end();
   }

   if (pathSegments.length === 0) {
      // Assuming you want to serve a specific HTML file for the home page
      const staticFilePath = "./static/home.html";

      try {
         // Attempt to serve HTML file
         await fileHandler.handleFileRequest(request, response);
      } catch (error) {
         if (error.code === 'ENOENT') {
            // If the file doesn't exist, serve the default template
            let template = (await fs.readFile(templatePath)).toString();
            statusCodeResponse(200, template, "text/html");
         } else {
            statusCodeResponse(500, '500 Internal Server Error', 'text/plain');
         }
      }
   } else {
      let seg = pathSegments.shift();
      // Check if the route corresponds to static files
      if (seg === 'static') {
         try {
            await fileHandler.handleFileRequest(request, response);
         } catch (error) {
            if (error.code === 'ENOENT') {
               statusCodeResponse(404, '404 Not Found', 'text/plain');
            } else {
               statusCodeResponse(500, '500 Internal Server Error', 'text/plain');
            }
         }
      } else if (seg === "games") {
         gameHandler.handleGameRoute(pathSegments, request, response);
      } else {
         statusCodeResponse(404, "404 Not Found", "text/plain");
      }
   }
};
