// 导入JWT
const jwt=require('jsonwebtoken')

// 创建token
// let token=jwt.sign(用户数据，加密字符串，配置对象)
let token=jwt.sign({
    username:'张三'
},'lucar',{
    expiresIn:60,//单位是秒
})

// console.log(token) //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsImlhdCI6MTcwOTAyMzM4OSwiZXhwIjoxNzA5MDIzNDQ5fQ.GZif5IRUsAQbLinWVy97dAq5o6RX_5dmWTqwQxJw5qc

let t=token//'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuW8oOS4iSIsImlhdCI6MTcwOTAyMzM4OSwiZXhwIjoxNzA5MDIzNDQ5fQ.GZif5IRUsAQbLinWVy97dAq5o6RX_5dmWTqwQxJw5qc'
// 校验token
jwt.verify(t,'lucar',(err,data)=>{
    if(err){
        console.log('校验失败')
        return
    }
    console.log(data)
    
})

