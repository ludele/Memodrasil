// game-script.js

const path = require('path');
const Game = require(path.join(__dirname, '..', '..', 'src', 'js', 'engine', 'game.js'));
const { ipcRenderer } = require('electron');

let game;

document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('request-narrative');

  // Set up the load narrative button
  document.getElementById('loadNarrativeFile').addEventListener('change', (event) => {
    event.preventDefault();
    const input = document.getElementById('loadNarrativeFile');
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const loadedNarrative = JSON.parse(reader.result);
        ipcRenderer.send('load-narrative', loadedNarrative);
        console.log('Narrative loaded successfully:', file.name);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a file to load.');
    }
  });

  // Set up the menu toggle
  const mainMenu = document.getElementById('mainMenu');
  const menuToggle = document.getElementById('menuToggle');
  mainMenu.style.display = 'none';

  function toggleMenu() {
    if (mainMenu.style.display === 'none') {
      mainMenu.style.display = 'block';
    } else {
      mainMenu.style.display = 'none';
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      mainMenu.style.display = 'none';
    });
  });
});

ipcRenderer.on('narrative-loaded', (event, narrative) => {
  game = new Game(narrative);
  displayCurrentScene(game);
});

function displayCurrentScene(game) {
  const scene = game.getCurrentScene();
  document.getElementById('narrativeText').innerText = scene.text;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  scene.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.onclick = () => {
      game.chooseOption(index);
      displayCurrentScene(game);
    };
    optionsContainer.appendChild(button);
  });
}

function handleMenuAction(action) {
  switch(action) {
    case 'exit':
      console.log('Exiting...');
      app.quit();
      break;
    default:
      console.log('Unknown action:', action);
  }
}