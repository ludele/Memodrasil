// creator.js

const fs = require('fs');
const path = require('path');
const utils = require(path.join(__dirname, '..', '..', 'src', 'js', 'engine', 'utils.js'));

let narrative = {};

// Event listener for the "Add Option" button click.
// Adds an option to the narrative.
document.getElementById('addOption').addEventListener('click', () => {
    var sceneName = document.getElementById('sceneName').value;
    var sceneText = document.getElementById('sceneText').value;
    var optionText = document.getElementById('optionText').value;
    var destination = document.getElementById('destination').value;

    if (!sceneName || !sceneText || !optionText || !destination) {
        alert('Please fill in all fields.');
        return;
    }

    if (!narrative[sceneName]) {
        narrative[sceneName] = { text: sceneText, options: [] };
    }

    narrative[sceneName].options.push({ text: optionText, destination: destination });

    document.getElementById('optionText').value = '';
    document.getElementById('destination').value = '';

    console.log('Option added:', optionText, '=>', destination);

    renderVisualization();
});

/**
 * Renders the narrative visualization.
*/
function renderVisualization() {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';

    const renderedScenes = new Set();

    const renderScene = (sceneName, parentNode) => {
        if (renderedScenes.has(sceneName)) return;
        renderedScenes.add(sceneName);

        const scene = narrative[sceneName];
        if (!scene) return;

        const sceneItem = document.createElement('ul');
        sceneItem.classList.add('scene-item');
        sceneItem.innerHTML = `<strong>${sceneName}:</strong> ${scene.text}`;

        const optionsList = document.createElement('ul');

        scene.options.forEach(option => {
            const optionItem = document.createElement('li');
            // Inner-html is more risky, but due to the idea of the project, it should not have any security issues.
            optionItem.innerHTML = `<strong>${option.text}</strong> (to: ${option.destination})`;
            optionItem.dataset.destination = option.destination;
            optionItem.dataset.sceneName = sceneName;
            optionItem.classList.add('option-item');

            optionsList.appendChild(optionItem);

            renderScene(option.destination, optionItem);
        });

        sceneItem.appendChild(optionsList);

        if (parentNode) {
            parentNode.appendChild(sceneItem);
        } else {
            visualization.appendChild(sceneItem);
        }
    };

    renderScene('start', null);

    visualization.addEventListener('click', (event) => {
        const optionItem = event.target.closest('.option-item');
        if (optionItem) {
            const destination = optionItem.dataset.destination;
            if (destination) {
                console.log('Go to destination:', destination);
                document.getElementById('sceneName').value = destination;

                const sceneText = narrative[destination].text;
                document.getElementById('sceneText').value = sceneText;
            }
        }

        const sceneItem = event.target.closest('.scene-item');
        if (sceneItem) {
            const sceneName = sceneItem.querySelector('strong').textContent.replace(':', '');
            if (sceneName) {
                console.log('Current Scene:', sceneName);
                document.getElementById('sceneName').value = sceneName;

                const sceneText = narrative[sceneName].text;
                document.getElementById('sceneText').value = sceneText;
            }
        }
    });

    visualization.addEventListener('mouseover', (event) => {
        if (event.target.tagName.toLowerCase() === 'li') {
            event.target.classList.add('hover');
            visualization.querySelectorAll('li').forEach(element => {
                if (element !== event.target && !element.contains(event.target)) {
                    element.classList.remove('hover');
                }
            });
        }
    });
}

/**
 * Event listener for DOMContentLoaded.
 * Renders the initial visualization.
*/
document.addEventListener('DOMContentLoaded', () => {
    renderVisualization();
});

/**
 * Event listener for the "Load Narrative" button click, where it loads a narrative from a file.
*/
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
    let narrativeName = document.getElementById("narrativeName").value;
    console.log(narrativeName);
    const outputPath = path.join(__dirname, narrativeName);
    const jsonContent = JSON.stringify(narrative, null, 2);

    fs.writeFileSync(outputPath, jsonContent);

    console.log('Narrative saved to:', outputPath);
});