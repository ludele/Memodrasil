// narrative-visualizer.js

const Game = require(path.join(__dirname, '..', '..', 'src', 'js', 'engine', 'game.js'));

const narrative = require(path.join(__dirname, '..', '..', 'src', 'assets', 'narratives', 'narrative.json')); 

const game = new Game(narrative);

function renderVisualization() {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = ''; 

    const currentScene = game.getCurrentScene();

    const sceneNode = document.createElement('div');
    sceneNode.classList.add('scene-node');
    sceneNode.textContent = currentScene.text;
    
    visualization.appendChild(sceneNode);

    currentScene.options.forEach(option => {
        const optionEdge = document.createElement('div');
        optionEdge.classList.add('option-edge');
        optionEdge.textContent = option.text;
        optionEdge.dataset.destination = option.destination;

        optionEdge.addEventListener('click', () => {
            game.chooseOption(option.destination);
            renderVisualization(); 
        });

        visualization.appendChild(optionEdge);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderVisualization();
});