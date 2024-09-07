const { BrowserWindow, app } = require("electron");
const path=require('path')
const os=require('os')

function createWindow(){
    const mainWindow=new BrowserWindow({
        width:600,
        height:400,
        // autoHideMenuBar:true,
        webPreferences:{
            preload:path.join(__dirname,'preload.js'),
            nodeIntegration:true,
        }
    })

    mainWindow.loadFile('index.html')
}

app.on('ready',()=>{
    createWindow()
})