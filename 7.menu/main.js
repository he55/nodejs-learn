const { BrowserWindow, app, Menu, MenuItemConstructorOptions, dialog } = require("electron")

/** @type {BrowserWindow} */
let mainWindow
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
    })
    mainWindow.loadFile('index.html')
}

function createMenu() {
    /** @type {MenuItemConstructorOptions[]} */
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    async click() {
                        const res = await dialog.showOpenDialog(mainWindow, {
                            defaultPath:__dirname,
                            properties:['multiSelections'],
                            filters: [
                                { name: 'Code File', extensions: ['js', 'html'] },
                                {name:'All File',extensions:['*']}
                            ]
                        })
                        console.log(res)
                    }
                },
                {
                    label: 'Save'
                },
                {
                    label: 'Error Dialog',
                    click() {
                        dialog.showErrorBox('Error', 'Error message')
                    }
                },
                {
                    label: 'Message Dialog',
                    async click() {
                        const res = await dialog.showMessageBox(mainWindow, {
                            title: 'Message title',
                            message: 'Click Message Dialog Menuitem',
                            buttons: ['ok', 'cancel']
                        })
                        console.log(res);
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: '复制',
                    role: 'copy',
                },
                {
                    type: 'separator'
                },
                {
                    role: 'paste'
                },
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
    createMenu()
})
