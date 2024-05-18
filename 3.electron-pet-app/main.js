const {app, BrowserWindow, Tray, Menu} = require('electron')
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
        skipTaskbar:true,
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })

    mainWindow.loadFile('Hiyori/index.html')
    // mainWindow.webContents.openDevTools()
}

function createTray(){
   const tray = new Tray('icon.png')
    const contextMenu = Menu.buildFromTemplate([
        {label:'Hiyori',enabled:false},
        {label:'Quit',click:()=>{
            app.exit()
        }}
    ])
    tray.setToolTip('Hiyori')
    tray.setContextMenu(contextMenu)
}

app.dock.hide()

app.whenReady().then(()=>{
    createTray()
    createWindow()
})