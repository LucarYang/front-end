export const count=2

if(import.meta.hot){
    import.meta.hot.accept((newModule)=>{
        console.log(newModule.count)
    })
}