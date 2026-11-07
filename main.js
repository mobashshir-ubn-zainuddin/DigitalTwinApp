const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#0b0f17',
    title: 'Room Digital Twin',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // Allow loading CDN resources (Three.js, Tailwind, FontAwesome)
      webSecurity: true,
    },
    show: false, // Don't show until ready-to-show
  });

  win.loadFile(path.join(__dirname, 'room_digital_twin.html'));

  // Show window once fully loaded (avoids white flash)
  win.once('ready-to-show', () => {
    win.show();
  });

  // Simple application menu
  const menu = Menu.buildFromTemplate([
    {
      label: 'App',
      submenu: [
        {
          label: 'Reload Simulation',
          accelerator: 'CmdOrCtrl+R',
          click: () => win.reload(),
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Full Screen',
          accelerator: 'F11',
          click: () => win.setFullScreen(!win.isFullScreen()),
        },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+=',
          click: () => win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5),
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => win.webContents.setZoomLevel(win.webContents.getZoomLevel() - 0.5),
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => win.webContents.setZoomLevel(0),
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
