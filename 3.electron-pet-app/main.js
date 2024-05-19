const {app, BrowserWindow, Tray, Menu} = require('electron')

function createWindow(){
   const mainWindow = new BrowserWindow({
        width:175,
        height:510,
        x:50,
        y:50,
        resizable:false,
        frame:false,
        transparent:true,
        skipTaskbar:true,
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

if(process.platform==='darwin')
app.dock.hide()

app.whenReady().then(()=>{
    createTray()
    createWindow()
})