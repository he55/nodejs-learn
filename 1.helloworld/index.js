const dayjs = require("dayjs")
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

console.log('hello world')

let time = dayjs().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss dddd')
console.log(time)