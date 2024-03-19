//utils.js

const fs = require('fs');
// const yaml = require('js-yaml');

function parseNarrativeIndex(indexFile) {
  try {
    const content = fs.readFileSync(indexFile, 'utf-8');
    return yaml.safeLoad(content);
  } catch (error) {
    console.error(`Error loading index file ${indexFile}:`, error);
    return null;
    }
}

function parseScene(sceneFile) {
  try {
    const content = fs.readFileSync(sceneFile, 'utf-8');
    return yaml.safeLoad(content);
  } catch (error) {
    console.error(`Error loading scene file ${sceneFile}:`, error);
    return null;
  }
}

function visualizeNarrativeOrder(index) {
  console.log('Narrative Order:');
  index.forEach((scene, index) => {
    console.log(`${index + 1}. ${scene.id}`);
    if (scene.options) {
      scene.options.forEach((option) => {
        console.log(`   - ${option.text} -> ${option.destination}`);
      });
    }
    console.log('---');
  });
}

function generateCustomId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return timestamp + randomPart;
}

function generateIdToDate() {
    const timestamp = Date.now()
    const randomPart = Math.random().toString(36).substring(2, 15);
    return timestamp + `-${randomPart}`;
}

module.exports = {
  visualizeNarrativeOrder,
  parseScene,
  parseNarrativeIndex,
  generateCustomId,
  generateIdToDate
}

//const index = parseNarrativeIndex('narrative_index.yaml');
//visualizeNarrativeOrder(index);

//const index = parseNarrativeIndex('narrative_index.yaml');
//console.log(index);