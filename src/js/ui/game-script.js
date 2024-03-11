document.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('request-narrative'); 
});

ipcRenderer.on('narrative-loaded', (event, narrative) => {
  const game = new Game(narrative); 
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
