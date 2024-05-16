import sharp from "sharp"

const imgPath='BingWallpaper.jpg'
const result = await sharp(imgPath).resize(200).toFile('thumb.webp')
console.log(result)
debugger
