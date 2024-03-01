/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

window.addEventListener('DOMContentLoaded', async () => {
    const { createApp, ref, onMounted } = Vue
    let emojiData = await ipc.getData()

    createApp({
        setup() {
            const mainElement = ref(null)

            const categories = ref(emojiData)
            const emojis = ref([])
            const selectedEmoji = ref({})

            function copyEmoji(emoji) {
                ipc.ipc('writeText', emoji.metadata.glyph)
            }
            function copyImage(emoji) {
                ipc.ipc('writeImage', emoji.previewImage)
            }
            function openFile(emoji) {
                ipc.ipc('showItemInFolder', emoji.previewImage)
            }

            let lastSelectedEmojis
            function catetoryItemClick(items) {
                if (lastSelectedEmojis) {
                    lastSelectedEmojis.isActive = false
                }

                items.isActive = true
                lastSelectedEmojis = items

                // const main = document.querySelector('.main')
                mainElement.value.scrollTop = 0
                emojis.value = items
            }

            function emojiItemClick(emoji) {
                if (selectedEmoji.value) {
                    selectedEmoji.value.isActive = false
                }

                emoji.isActive = true
                selectedEmoji.value = emoji
            }

            onMounted(() => {
                catetoryItemClick(emojiData['Activities'])
                emojiItemClick(emojiData['Activities'][0])
            })

            return {
                mainElement,
                categories,
                emojis,
                selectedEmoji,
                catetoryItemClick,
                emojiItemClick,
                copyEmoji,
                copyImage,
                openFile,
            }
        }
    }).mount('#app')
})
