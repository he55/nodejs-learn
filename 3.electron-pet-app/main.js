const {app, BrowserWindow} = require('electron')
const path=require('path')

/** @type {BrowserWindow} */
let mainWindow

function createWindow(){
    mainWindow = new BrowserWindow({
        width:175,
        height:510,
        x:50,
        y:50,
        resizable:false,
        frame:false,
        transparent:true,
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })

    mainWindow.loadFile('Hiyori/index.html')
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(()=>{
    createWindow()
})