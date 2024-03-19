// main.js

const { app, BrowserWindow, ipcMain } = require('electron/main')
const fs = require('fs/promises');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false 
    }
  });

  mainWindow.loadFile('./html/index.html')
}

ipcMain.on('open-game-window', async () => {
  try {

    // Will need a new system to make the user be able to at-least load narratives.
    const narrativePath = path.join(__dirname, '..', '..', 'assets', 'narratives', 'abc.json');
    
    const data = await fs.readFile(narrativePath, 'utf8');
    
    await mainWindow.loadFile('./html/game-window.html');

    mainWindow.webContents.send('narrative-loaded', JSON.parse(data));
  } catch (err) {
    console.error("Failed to load narrative:", err);
  }
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})