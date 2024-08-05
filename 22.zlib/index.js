const fs = require('node:fs')
const zlib = require('node:zlib')

// const source = fs.createReadStream('test.json')
// const destination = fs.createWriteStream('test.json.gz')
// source.pipe(zlib.createGzip()).pipe(destination)
// console.log('zip ok')


// const source2 = fs.createReadStream('test.json.gz')
// const destination2 = fs.createWriteStream('test2.json')
// source2.pipe(zlib.createGunzip()).pipe(destination2)
// console.log('unzip ok')


// const source3 = fs.createReadStream('test.json')
// const destination3 = fs.createWriteStream('test.json.deflate')
// source3.pipe(zlib.createDeflate()).pipe(destination3)
// console.log('deflate ok')


const source4 = fs.createReadStream('test.json.deflate')
const destination4 = fs.createWriteStream('test4.json')
source4.pipe(zlib.createInflate()).pipe(destination4)
console.log('inflate ok')
