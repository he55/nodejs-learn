import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { setTimeout } from 'node:timers/promises'

const output = 'output'
if (!fs.existsSync(output))
    fs.mkdirSync(output)

const listFile = 'list.json'
if (!fs.existsSync(listFile)) {
    console.log('list.json is not exists')
    process.exit(1)
}

const jsonStr = fs.readFileSync(listFile, 'utf8')
const list = JSON.parse(jsonStr)

let i = 0
var document
for (const item of list) {
    const { name, url } = item
    const filepath = path.resolve(output, name + '.txt')
    if (fs.existsSync(filepath))
        continue

    console.log(`${name}  ${url}`)
    const res = await fetch(url)
    const html = await res.text()
    const dom = new JSDOM(html)
    document = dom.window.document
    const ele = dom.window.document.querySelector('#ad script')
    const script = ele.text
    eval(script)
    let r = document.getElementById("ad").textContent.replaceAll('    ','')
    fs.writeFileSync(filepath, r)

    await setTimeout(1000)

    // i++
    // if (i == 3)
    //     break
}

function _ii_rr(content) {
    content = atob(content);
    var arrays = new Array();
    arrays = content.split(',');
    var $chapter = document.getElementById("chapter").innerHTML;
    $chapter = $chapter.replace(new RegExp(/\[.*?\]/), '');
    var datas = [];
    datas = $chapter.split('<br><br>');
    var $html = '';
    var el = arrays[0];
    var len = datas.length;
    for (var i = 1; i <= len; i++) {
        $html += datas[arrays[i] - el] + '<br/><br/>';
    }
    document.getElementById("ad").innerHTML = $html;
}
