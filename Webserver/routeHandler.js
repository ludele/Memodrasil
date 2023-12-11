// routeHandler.js
const fs = require('fs').promises;
const templatePath = './templates/index.maru';
const gameHandler = require('./routeHandlers/gameHandler');
const fileHandler = require('./fileHandler'); // Adjust the path as needed

exports.handleRoute = async function (pathSegments, request, response) {
  function statusCodeResponse(code, value, type) {
    response.writeHead(code, { 'Content-Type': `${type}` });
    response.write(value);
    response.end();
  }

  if (pathSegments.length === 0) {
    const staticFilePath = './static/home.html';

    try {
      await fileHandler.handleFileRequest(request, response);
    } catch (error) {
      if (error.code === 'ENOENT') {
        let template = (await fs.readFile(templatePath)).toString();
        statusCodeResponse(200, template, 'text/html');
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
    } else if (seg === 'games') {
      // Check if the user is requesting the game template
      if (pathSegments[0] === 'template') {
        const gameTemplatePath = './templates/game-template.maru'; // Adjust the path as needed
        try {
          let gameTemplate = (await fs.readFile(gameTemplatePath)).toString();
          statusCodeResponse(200, gameTemplate, 'text/html');
        } catch (error) {
          statusCodeResponse(500, '500 Internal Server Error', 'text/plain');
        }
      } else {
        gameHandler.handleGameRoute(pathSegments, request, response);
      }
    } else {
      statusCodeResponse(404, '404 Not Found', 'text/plain');
    }
  }
};
