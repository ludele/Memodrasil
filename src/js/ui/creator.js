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

    const renderedScenes = new Set(); // Keep track of rendered scenes

    const renderScene = (sceneName, parentNode) => {
        if (renderedScenes.has(sceneName)) return; // Check if scene has already been rendered
        renderedScenes.add(sceneName); // Add scene to rendered scenes

        const scene = narrative[sceneName];
        if (!scene) return;

        const optionsList = document.createElement('ul');

        scene.options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.textContent = option.text;
            optionItem.dataset.destination = option.destination;
            optionItem.dataset.sceneName = sceneName;

            optionsList.appendChild(optionItem);

            // Recursively render nested scenes
            renderScene(option.destination, optionItem);
        });

        if (parentNode) {
            parentNode.appendChild(optionsList);
        } else {
            visualization.appendChild(optionsList);
        }
    };

    // Start rendering from the root node
    renderScene('start', null);

    visualization.addEventListener('click', (event) => {
        const optionItem = event.target.closest('li');
        if (optionItem) {
            const destination = optionItem.dataset.destination;
            if (destination) {
                const sceneName = optionItem.dataset.sceneName;
                console.log('Current Scene:', sceneName, 'Go to destination:', destination);
                document.getElementById('sceneName').value = destination;
    
                const sceneText = narrative[destination].text;
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