/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

let selectedEmoji
function loadData(emojis) {
    /** @type {HTMLDivElement} */
    let sdiv
    const main = document.querySelector('.main')
    main.innerHTML = ''

    for (let i = 0; i < emojis.length; i++) {
        const emoji = emojis[i]
        const div = document.createElement('div')
        div.dataset.id = emoji.id
        div.className = 'item'
        div.innerHTML = `
            <img src="${emoji.previewImage}" alt="">
            <p>${emoji.name}</p>
            `
        div.onclick = /** @this HTMLDivElement */ function () {
            sdiv?.classList.remove('active')
            this.classList.add('active')
            sdiv = this

            const emoji = emojis.find(item => item.id === this.dataset.id)
            document.getElementById('img').src = emoji.previewImage
            document.getElementById('name').innerText = emoji.name
            selectedEmoji=emoji
        }
        main.append(div)
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('btn1').addEventListener('click',()=>{
        ipc.ipc('writeText',selectedEmoji.metadata.glyph)
    })
    document.getElementById('btn2').addEventListener('click',()=>{
        ipc.ipc('writeImage',selectedEmoji.previewImage)
    })
    document.getElementById('btn4').addEventListener('click',()=>{
        ipc.ipc('showItemInFolder',selectedEmoji.previewImage)
    })

    const ul=document.querySelector('.left>ul')
    const group=await ipc.getData()
    for (const key in group) {
        const li=document.createElement('li')
        li.innerText=key
        li.dataset.id=key
        li.onclick = /** @this HTMLLIElement */ function () {
            document.querySelectorAll('.left>ul>li').forEach(ele => ele.classList.remove('active'))
            this.classList.add('active')
            const data=group[this.dataset.id]
            loadData(data)
        }
        ul.append(li)
    }

    document.querySelector('.left>ul>li').click()
    document.querySelector('.main>.item').click()
})
