/***
 * 
 */

// 1、导入fs模块
// const fs=require('fs')
// // 2、写入文件
// fs.writeFile('./zuoyouming.txt','三人行必有我师',err=>{
//     // err写入失败err是一个错误对象，写入成功：null
//     if(err){
//         console.log('写入失败');
//         return;
//     }
//     console.log('写入成功')
// })

// console.log(1+1)

// fs.writeFileSync('./data.txt','test')
// 2
// 写入成功

// const fs=require('fs')
// //异步
// fs.appendFile('./zuoyouming.txt','择其善者而从之，其不善者而改之',err=>{
//     if(err){
//         console.log('写入失败');
//         return;
//     }
//     console.log('写入成功')
// })
// //同步
// fs.appendFileSync('./zuoyouming.txt','\r\n问个而知新')

// // writeFile追加

// fs.writeFile('./zuoyouming.txt','love love love',err=>{
//     // err写入失败err是一个错误对象，写入成功：null
//     if(err){
//         console.log('写入失败');
//         return;
//     }
//     console.log('写入成功')
// })

// createWriteStream流失写入
// const fs=require('fs')
// const ws=fs.createWriteStream('./观书有感.txt')


// ws.write('半亩方塘一鉴开\r\n')
// ws.write('天光云影共徘徊\r\n')
// ws.write('问渠那得清如许\r\n')
// ws.write('为有源头活水来\r\n')

// 关闭通道
// ws.close()
