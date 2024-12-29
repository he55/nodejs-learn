import fs from 'node:fs'
import { JSDOM } from 'jsdom'

const list = []
for (let i = 1; i < 62; i++) {
    const url = `https://www.guiyunwx.org/detail/pycycme/${i}/`
    console.log(url)
    const res = await fetch(url)
    const html = await res.text()
    const dom = new JSDOM(html)
    const eles = dom.window.document.querySelectorAll('dl.panel-body.panel-chapterlist a')
    eles.forEach(e => {
        let name = e.text
        const idx = e.text.indexOf('（')
        if (idx > 0)
            name = e.text.substring(0, idx)
        list.push({ name, url: e.href })
    })
}

const jsonStr = JSON.stringify(list, null, 2)
fs.writeFileSync('list.json', jsonStr)
