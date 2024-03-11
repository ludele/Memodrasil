const { app, BrowserWindow, ipcMain } = require('electron/main')
const fs = require('fs');
const path = require('path');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false 
    }
  });

  mainWindow.loadFile('./html/index.html')
}

ipcMain.on('open-game-window', () => {
  mainWindow.loadFile('./html/game-window.html');
  const narrativePath = path.join(__dirname, './assets/narratives/narritive.json');
  fs.readFile(narrativePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Failed to load narrative:", err);
      return;
    }
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('narrative-loaded', JSON.parse(data));
    });
  });
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