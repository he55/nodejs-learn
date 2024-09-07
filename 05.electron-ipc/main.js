const {app, BrowserWindow, ipcMain, dialog}=require('electron')
const path=require('path')

/** @type {BrowserWindow} */
let mainWindow

function createWindow(){
    mainWindow = new BrowserWindow({
        width:300,
        height:200,
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(()=>{
    createWindow()
})

ipcMain.handle('selectFile',async ()=>{
    const {canceled, filePaths}=await dialog.showOpenDialog({
        title:'Select Directory',
        properties:['openDirectory'],
    })
    if(canceled)
        return ''
    return filePaths[0]
})
