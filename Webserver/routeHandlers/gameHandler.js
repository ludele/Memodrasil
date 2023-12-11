// gameHandler.js
const fs = require('fs').promises;
const path = require('path');
const Game = require('../game');
const fileHandler = require('../fileHandler'); // Adjust the path as needed
const { Script } = require('vm');

let currentGame;

async function handleGameRoute(pathSegments, request, response) {
  // Initialize the game if not already
  if (!currentGame) {
    const narrativeFile = await fs.readFile('./narrative.json'); // Adjust the path as needed
    const narrative = JSON.parse(narrativeFile);
    currentGame = new Game(narrative);
  }

  // Handle user choices
  if (pathSegments.length === 1 && pathSegments[0] === 'choose') {
    const optionIndex = parseInt(request.headers['x-option-index']);
    currentGame.chooseOption(optionIndex);
  }

  // Render the current scene
  const currentScene = currentGame.getCurrentScene();
  const responseContent = `
    <h1>${currentScene.text}</h1>
    <ul>
      ${currentScene.options.map((option, index) => `<li><a href="/games/choose" onclick="chooseOption(${index})">${option.text}</a></li>`).join('')}
    </ul>
    <script src="../static/game-script.js"></script>
  `;

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(responseContent);
  response.end();
}

module.exports = { handleGameRoute };
