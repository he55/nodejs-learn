// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell, clipboard, nativeImage } = require('electron')
const path = require('path')
const fs = require('fs')

let data = loadData("C:\\Users\\admin\\Documents\\GitHub\\fluentui-emoji\\assets")

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 915,
    height: 560,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('ipc', (e, name, ...arg) => {
  if (name === 'writeText') {
    clipboard.writeText(arg[0])
  } else if (name === 'writeImage') {
    const image = nativeImage.createFromPath(arg[0])
    clipboard.writeImage(image)
  } else if (name === 'showItemInFolder') {
    shell.showItemInFolder(arg[0])
  }
})

ipcMain.handle('getData', () => {
  return data;
})

function loadData(assetPath) {
  const dirs = fs.readdirSync(assetPath)
  const data = []
  const groupData = {}
  for (const dir of dirs) {
    const fullPath = path.resolve(assetPath, dir)
    const metadata = require(path.resolve(fullPath, 'metadata.json'))
    let previewImage

    let imagePaths = [path.resolve(fullPath, '3D'), path.resolve(fullPath, 'Default', '3D')]
    for (const imagePath of imagePaths) {
      if (fs.existsSync(imagePath)) {
        let files = fs.readdirSync(imagePath)
        if (files.length === 0)
          return
        previewImage = path.resolve(imagePath, files[0])
      }
    }

    const { unicode, group } = metadata
    const obj = {
      metadata,
      id: unicode,
      name: dir,
      previewImage,
    }
    data.push(obj)

    if (!groupData[group])
      groupData[group] = []
    groupData[group].push(obj)
  }
  return groupData
}
