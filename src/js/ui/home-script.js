const { ipcRenderer } = require('electron');

console.log("test");

document.getElementById('startGameBtn').addEventListener('click', () => {
    ipcRenderer.send('open-game-window');
});