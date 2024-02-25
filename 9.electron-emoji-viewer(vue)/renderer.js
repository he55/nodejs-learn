/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */


window.addEventListener('DOMContentLoaded', async () => {
    const { createApp, ref, onMounted  } = Vue
    let group = await ipc.getData()

    createApp({
      setup() {
        const list=ref([])
        const groups = ref(group)
        const sel=ref({})
        const main=ref(null)

        function copyEmoji(){
            ipc.ipc('writeText', sel.value.metadata.glyph)
        }
        function copyImage(){
            ipc.ipc('writeImage', sel.value.previewImage)
        }
        function openFile(){
            ipc.ipc('showItemInFolder', sel.value.previewImage)
        }
    
        let last
        function click(data){
            if(last)
                last.isActive=false
    
            data.isActive=true
            last=data
    
            // const main = document.querySelector('.main')
            main.value.scrollTop=0
            list.value=data
        }
    
        function itemClick (item) {
            if(sel.value)
                sel.value.isActive=false
    
            item.isActive=true
            sel.value = item
        }

        onMounted (()=>{
            click(group['Activities'])
            itemClick(group['Activities'][0])
        })
        return {
          list,
          itemClick,
          groups,
          click,
          sel,
          copyEmoji,
          copyImage,
          openFile,
          main
        }
      }
    }).mount('#app')

})
