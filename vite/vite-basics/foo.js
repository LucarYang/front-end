export const foo=()=>{
    console.log('foo works!!!!!!!')
}

let cache={
    amount:0
}

if(import.meta.hot){
    import.meta.hot.dispose(()=>{
        if(timer){
            clearInterval(timer)
        }
    })
    cache=import.meta.hot.data.cache={
        amount:import.meta.hot.data.cache?import.meta.hot.data.cache.amount:0
    }
}

let timer=setInterval(()=>{
    cache.amount++
    console.log(cache.amount)
},1000)

export{
    cache
}