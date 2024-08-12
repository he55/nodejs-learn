import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

await pipeline(
    createReadStream('package-lock.json'),
    createGzip(),
    createWriteStream('package-lock.json.gz')
)

console.log('ok')
