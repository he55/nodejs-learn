document.addEventListener('DOMContentLoaded',()=>{
    const text= document.getElementById('text')
    document.getElementById('btn').addEventListener('click',async ()=>{
        text.innerText = await mapi.selectFile()
    })

})