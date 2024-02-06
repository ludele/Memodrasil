// routeHandler.js
const fs = require('fs').promises;
const templatePath = './templates/index.maru';
const gameHandler = require('./routeHandlers/gameHandler');
const fileHandler = require('./fileHandler');

function generateRouteList() {
  let lis = "";

  const routes = [
    { name: "Blog", url: "/blog" },
    { name: "Games", url: "/games" },
    { name: "Misc", url: "/misc"},
    { name: "About", url: "/about"},

  ];

  routes.forEach((route) => {
    lis += `<li><a href="${route.url}">${route.name}</a></li>`;
  });

  return lis;
}

exports.handleRoute = async function (pathSegments, request, response, session) {
  function statusCodeResponse(code, value, type) {
    response.writeHead(code, { 'Content-Type': `${type}` });
    response.write(value);
    response.end();
  }

  if (pathSegments.length === 0) {

    const template = (await fs.readFile(templatePath)).toString();
    const routeList = generateRouteList();
    const templateWithRoutes = template.replace("%links%", routeList);

    statusCodeResponse(200, templateWithRoutes, "text/html");
    return;
    saveSession(sessionId, session, response)

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
      if (pathSegments[0] === 'template') {
        const gameTemplatePath = './templates/game-template.maru';
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
