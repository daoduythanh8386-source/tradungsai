const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

Menu.setApplicationMenu(null);

// Chỉ cho mở 1 cửa sổ
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 850,
    minWidth: 360,
    minHeight: 600,
    title: 'Tra dung sai',
    icon: path.join(__dirname, '../build/icon.png'),
    backgroundColor: '#eef2f9',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  mainWindow.setTitle('Tra dung sai');
  mainWindow.loadFile(path.join(__dirname, '../www/index.html'));

  // Link ngoài (vd gọi điện) mở bằng ứng dụng hệ thống, không mở trong app
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^(https?|tel|mailto):/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('page-title-updated', e => e.preventDefault());
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
