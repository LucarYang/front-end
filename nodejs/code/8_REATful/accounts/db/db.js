/* 
@param {*} success 数据库连接成功的回调
@param {*} error 数据库连接失败的回调
*/

module.exports= function(success,error){
    // 判断 error 为期设置一个默认值
    if(typeof error!=='function'){
        error=()=>{
            console.log('连接失败~')
        }
    }
    // 1、安装mongoose
    // 2、导入
    const  mongoose=require('mongoose')

    // 设置strictQuery为true
    mongoose.set('strictQuery',true)

    const {DBHOST,DBPORT,DBNAME}=require('../config/config')

    // 3、连接
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    // 4、设置回调
    //设置连接成功的回调
    // mongoose.connection.on('open',()=>{  官方推荐使用once
    mongoose.connection.once('open',()=>{
        success()
    })

    //设置连接错误的回调
    mongoose.connection.on('errror',()=>{
        error()
    })

    //设置连接关闭的回调
    // mongoose.connection.on('close',()=>{
    //     console.log('连接关闭')
    // })
    /// // 8、关闭时数据库连接
    // mongoose.disconnect()
}