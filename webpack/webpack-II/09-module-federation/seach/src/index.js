Promise.all([import('nav/Header'),import('home/HomeList')])
.then(([
    {
        default:Header
    },
    {
        default:HomeList
    }
])=>{
    document.body.appendChild(Header())
    document.body.innerHTML+=HomeList(3)
})
// import('nav/Header').then((Header) => {
//     document.body.appendChild(Header.default())
// })