// index.js
"use strict";

const http = require("http");
const port = "3001";
const routeHandler = require("./routeHandler");

async function handleRequest(request, response) {
   let url = new URL(request.url, "https://" + request.headers.host);
   let path = url.pathname;
   let pathSegments = path.split("/").filter(function (element) {
      return element !== "";
   });

   console.log('Request URL:', request.url);
   console.log('Path Segments:', pathSegments);

   let sessionId = getSessionId(request);

   let session = sessions[sessionId] || {};

   if (!session.game) {
      session.game = new Game(narrative);
   }


   await routeHandler.handleRoute(pathSegments, request, response); // add session later.

   saveSession(sessionid, session, response);
}

const app = http.createServer(handleRequest);

process.on('uncaughtException', (error) => {
   console.error('Uncaught Exception:', error);
   process.exit(1); 
 });
 
 process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection:', reason);
   process.exit(1); 
 });

app.listen(port);
console.log(`Listening to ${port}`);


function saveSession(request, session) {
   const sessionId = request.headers.cookie;
   if (sessionId) {
      sessions[sessionId] = session;
   }
}

function getSessionId(request) {
   const cookies = request.headers.cookie || '';
   const cookieArray = cookies.split(';');
   for (const cookie of cookieArray) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'sessionId') {
         return value;
      }
   }
   const newSessionId = generateSessionId();
   return newSessionId;
}
