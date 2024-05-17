import { createWorker } from 'tesseract.js'

const worker = await createWorker('chi_sim')
const ret = await worker.recognize('2.png')
console.log(ret.data.text)
await worker.terminate()
