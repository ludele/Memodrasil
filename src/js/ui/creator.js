// creator.js

const fs = require('fs');
const path = require('path');

const narrative = {};

document.getElementById('addOption').addEventListener('click', () => {
    const sceneText = document.getElementById('sceneText').value;
    const optionText = document.getElementById('optionText').value;
    const destination = document.getElementById('destination').value;

    if (!sceneText || !optionText || !destination) {
        alert('Please fill in all fields.');
        return;
    }

    if (!narrative[sceneText]) {
        narrative[sceneText] = { options: [] };
    }

    narrative[sceneText].options.push({ text: optionText, destination: destination });

    document.getElementById('optionText').value = '';
    document.getElementById('destination').value = '';

    console.log('Option added:', optionText, '=>', destination);
});

document.getElementById('saveNarrative').addEventListener('click', () => {
    const outputPath = path.join(__dirname, 'narrative.json');
    const jsonContent = JSON.stringify(narrative, null, 2);

    fs.writeFileSync(outputPath, jsonContent);

    console.log('Narrative saved to:', outputPath);
});
