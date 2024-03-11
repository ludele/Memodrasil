function displayCurrentScene() {
  const scene = narrative[currentScene];
  document.getElementById('narrativeText').innerText = scene.text;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  scene.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.addEventListener('click', () => chooseOption(index));
      optionsContainer.appendChild(button);
  });
}

function chooseOption(index) {
  const chosenOption = narrative[currentScene].options[index];

  currentScene = chosenOption.destination;

  displayCurrentScene();
}