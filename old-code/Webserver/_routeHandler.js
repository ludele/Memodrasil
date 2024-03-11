// routeHandler.js

const fs = require("fs").promises;
const templatePath = "./templates/index.maru";
const gameHandler = require("./routeHandlers/gameHandler");
const fileHandler = require("./fileHandler");

function generatePostHTML(post) {
   return `
     <div class="post">
       <h2 class="post-title">${post.title}</h2>
       <p class="small-box"><strong>${post.author}</strong> @ ${post.date}</p>
       <p class="box">${post.content}</p>
       <div class="post-details">
       </div>
     </div>
   `;
}

exports.handleRoute = async function (pathSegments, request, response) {
   function statusCodeResponse(code, value, type) {
      response.writeHead(code, { 'Content-Type': `${type}` });
      response.write(value);
      response.end();
   }

   if (pathSegments.length === 0) {
      const staticFilePath = "./static/home.html";

      try {
         await fileHandler.handleFileRequest(request, response);
      } catch (error) {
         if (error.code === 'ENOENT') {
            let template = (await fs.readFile(templatePath)).toString();
            statusCodeResponse(200, template, "text/html");
         } else {
            statusCodeResponse(500, '500 Internal Server Error', 'text/plain');
         }
      }
   } else {
      let seg = pathSegments.shift();
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
