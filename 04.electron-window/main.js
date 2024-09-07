const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const path = require('path')

/** @type {BrowserWindow} */
let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 480,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('min', () => {
    mainWindow.minimize()
})
ipcMain.on('restore', () => {
    if (mainWindow.isMaximized())
        mainWindow.restore()
    else
        mainWindow.maximize()
})
ipcMain.on('close', () => {
    mainWindow.close()
})
