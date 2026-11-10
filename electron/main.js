const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Ẩn menu mặc định
Menu.setApplicationMenu(null);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    title: 'Tra Cứu Dung Sai Oristar',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Tải giao diện từ thư mục www/
  mainWindow.loadFile(path.join(__dirname, '../www/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
