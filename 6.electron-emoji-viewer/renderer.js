/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

let emojis = []

function loadData(idx) {
    /** @type {HTMLDivElement} */
    let sdiv
    const main = document.querySelector('.main')
    main.innerHTML = ''

    emojis = api.data
  
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
        }
        main.append(div)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const lis = document.querySelectorAll('li')
    lis.forEach(item => {
        item.onclick = /** @this HTMLLIElement */ function () {
            lis.forEach(item2 => item2.classList.remove('active'))
            this.classList.add('active')
            const id = parseInt(this.dataset.id)
            loadData(id)
        }
    })

    lis[0].click()

})
