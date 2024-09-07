const { powerMonitor, powerSaveBlocker, app } = require('electron')
const fs=require('fs')
const path = require('path')
const dirs=fs.readdirSync('app.asar')
console.log(dirs)

const filePath=path.resolve('app.asar','package.json')
const package=fs.readFileSync(filePath,'utf8')
const json = require(filePath)
console.log(package)

const appPath=app.getAppPath()
const userData = app.getPath('userData')
const exe=app.getPath('exe')
const v= app.getPath('sessionData')

const ff= fs.statSync('package.json')
const gg=ff.isFile()



// powerMonitor
setInterval(()=>{
    console.log(powerMonitor.getSystemIdleTime())
},1000)

powerMonitor.on('lock-screen',()=>{
    console.log('lock screen')
})

powerMonitor.on('unlock-screen',()=>{
    console.log('unlock screen');
})

powerSaveBlocker.start('prevent-app-suspension')