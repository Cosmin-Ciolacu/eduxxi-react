const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  const appUrl = !isDev
    ? `file://${path.join(__dirname, "../build/index.html")}`
    : "http://localhost:3000";
  win.webContents.openDevTools();
  win.loadURL(appUrl);
}

app.on("ready", createWindow);
