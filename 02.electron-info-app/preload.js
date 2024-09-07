const { contextBridge } = require("electron")
const os=require('os')

function get_process_info(){
    let info={}
    for(const key in process){
        const val=process[key]
        if(val instanceof Function)
            continue
        info[key]=val
    }
    return JSON.stringify(info,null,2)
}

function get_os_info(){
    let osinfo={}
    for(const key in os){
        const val=os[key]
        if(val instanceof Function&& !key.startsWith('set')){
            osinfo[key+'()']=val()
        }else{
            osinfo[key]=val
        }
    }
    return JSON.stringify(osinfo,null,2)
}

contextBridge.exposeInMainWorld('electronAPI',{
    get_process_info,
    get_os_info,
})