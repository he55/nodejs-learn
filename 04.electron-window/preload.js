const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('api',{
    min:function(){
        ipcRenderer.send('min')
    },
    restore:function(){
        ipcRenderer.send('restore')
    },
    close:function(){
        ipcRenderer.send('close')
    }
})
