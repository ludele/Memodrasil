// creator.js

const fs = require('fs');
const path = require('path');
const utils = require(path.join(__dirname, '..', '..', 'src', 'js', 'engine', 'utils.js'));

let narrative = {};

document.getElementById('addOption').addEventListener('click', () => {

    var sceneName = document.getElementById('sceneName').value;
    var sceneText = document.getElementById('sceneText').value;
    var optionText = document.getElementById('optionText').value;
    var destination = optionText;
    var counter = 1;

    while (narrative[destination]) {
        destination = optionText + '-' + counter;
        counter++;
    }

    if (!sceneName | !sceneText || !optionText || !destination) {
        alert('Please fill in all fields.');
        return;
    }

    if (!narrative[sceneName]) {
        narrative[sceneName] = { text: sceneText, options: [] };
    }

    narrative[sceneName].options.push({ text: optionText, destination: destination });

    document.getElementById('optionText').value = '';
    // document.getElementById('destination').value = '';

    console.log('Option added:', optionText, '=>', destination);

    renderVisualization();
});

function renderVisualization() {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';

    for (const sceneText in narrative) {
        if (narrative.hasOwnProperty(sceneText)) {
            const sceneNode = document.createElement('div');
            sceneNode.classList.add('scene-node');
            sceneNode.textContent = sceneText;

            const optionsList = document.createElement('ul');

            narrative[sceneText].options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.textContent = option.text;
                optionItem.dataset.destination = option.destination;
                optionItem.dataset.sceneName = sceneText;

                optionsList.appendChild(optionItem);
            });

            sceneNode.appendChild(optionsList);
            visualization.appendChild(sceneNode);
        }
    }

    document.addEventListener('click', (event) => {
        const destination = event.target.dataset.destination;
        if (destination) {
            const sceneName = event.target.dataset.sceneName;
            console.log('Current Scene:', sceneName, 'Go to destination:', destination);
            document.getElementById('sceneName').value = destination;
        }
    });

}
document.addEventListener('DOMContentLoaded', () => {
    renderVisualization();
});

/**
 * Display the scene text when a scene is clicked.
 */
document.addEventListener('click', (event) => {
    const destination = event.target.dataset.destination;
    if (destination) {
        const sceneName = event.target.dataset.sceneName;
        console.log('Current Scene:', sceneName, 'Go to destination:', destination);
        document.getElementById('sceneName').value = destination;

        const sceneText = narrative[sceneName].text;
        document.getElementById('sceneText').value = sceneText;
    }
});

document.getElementById('loadNarrativeButton').addEventListener('click', (event) => {
    event.preventDefault();

    const input = document.getElementById('loadNarrativeFile');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const loadedNarrative = JSON.parse(reader.result);
            Object.assign(narrative, loadedNarrative);
            console.log('Narrative loaded successfully:', file.name);
            renderVisualization();
            document.getElementById("narrativeName").value = file.name;
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file to load.');
    }
});


document.getElementById('saveNarrative').addEventListener('click', () => {
    //let narrativeName = utils.generateIdToDate();
    let narrativeName = document.getElementById("narrativeName").value;
    console.log(narrativeName);
    const outputPath = path.join(__dirname, narrativeName);
    const jsonContent = JSON.stringify(narrative, null, 2);

    fs.writeFileSync(outputPath, jsonContent);

    console.log('Narrative saved to:', outputPath);
});
