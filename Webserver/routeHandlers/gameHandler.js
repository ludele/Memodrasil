const fs = require('fs').promises;
const Game = require('../game');
const fileHandler = require('../fileHandler'); 

let currentGame;

function replaceTemplateSync(data, template) {
  for (const [placeholder, value] of Object.entries(data)) {
    const regex = new RegExp(`%${placeholder}%`, 'g');
    template = template.replace(regex, value);
  }
  return template;
}

async function handleGameRoute(pathSegments, request, response) {
  if (!currentGame) {
    const narrativeFile = await fs.readFile('./narritive.json');
    const narrative = JSON.parse(narrativeFile);
    currentGame = new Game(narrative);
  }

  if (pathSegments.length === 1 && pathSegments[0] === 'choose') {
    const optionIndex = parseInt(request.headers['x-option-index']);
    currentGame.chooseOption(optionIndex);
  }

  const currentScene = currentGame.getCurrentScene();
  const templateData = {
    title: currentScene.title,
    content: 
    `
      <h1>${currentScene.text}</h1>
        ${currentScene.options.map((option, index) => `<li class="wrapper"><a href="/games/choose" onclick="chooseOption(${index})">${option.text}</a></li>`).join('')}
      </ul>
      <script src="../static/game-script.js" defer></script>
    `
  };

  let template = (await fs.readFile('./templates/game-template.maru')).toString(); // Adjust the path as needed

  template = replaceTemplateSync(templateData, template);

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(template);
  response.end();
}

module.exports = { handleGameRoute };