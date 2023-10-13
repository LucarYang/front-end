console.log('hello webpack pwa!')

if('serviceWorker' in navigator){
    console.log('serviceWorker')
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/service-worker.js').then(registration=>{
            console.log('SW 注册成功',registration)
        }).catch(registrationError=>{
            console.log('SW 注册失败',registrationError)
        })
    })
}