const box=document.querySelector('#box')

document.querySelector('#btn1').addEventListener('click',()=>{
    let processinfo=electronAPI.get_process_info()
    box.value=processinfo
})

document.querySelector('#btn2').addEventListener('click',()=>{
    let osinfo=electronAPI.get_os_info()
    box.value=osinfo
})