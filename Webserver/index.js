// index.js
"use strict";

const http = require("http");
const port = "3000";
const routeHandler = require("./routeHandler");

async function handleRequest(request, response) {
   let url = new URL(request.url, "https://" + request.headers.host);
   let path = url.pathname;
   let pathSegments = path.split("/").filter(function (element) {
      return element !== "";
   });

   console.log('Request URL:', request.url);
   console.log('Path Segments:', pathSegments);

   await routeHandler.handleRoute(pathSegments, request, response);
}

const app = http.createServer(handleRequest);

app.listen(port);
console.log(`Listening to ${port}`);