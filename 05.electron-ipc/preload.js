const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('mapi',{
    selectFile:()=>{
        return ipcRenderer.invoke('selectFile')
    }
})