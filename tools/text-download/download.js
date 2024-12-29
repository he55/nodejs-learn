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

for (const item of list) {
    const { name, url } = item
    const filepath = path.resolve(output, name + '.txt')
    if (fs.existsSync(filepath))
        continue

    console.log(`${name}  ${url}`)
    const res = await fetch(url)
    const html = await res.text()

    const a = html.match(/_ii_rr\('(.+)'\)/)
    if (!a)
        throw new Error('key is not found')

    const key = a[1]
    const dom = new JSDOM(html)
    let text = _ii_rr(key, dom.window.document)
    text = text.replaceAll('    ', '')
    fs.writeFileSync(filepath, text)

    await setTimeout(1000)
}

function _ii_rr(content, document) {
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
    return document.getElementById('ad').textContent
}
