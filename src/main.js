import { app, BrowserWindow } from 'electron';

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  }); 
  win.setMenuBarVisibility(false)
  win.loadURL('https://vi-frontend-orcin.vercel.app/');
}

app.whenReady().then(() => {
  createWindow();
});
