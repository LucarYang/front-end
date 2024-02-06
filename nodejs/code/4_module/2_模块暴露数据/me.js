function test(){
    console.log('hello')
}
function hello(){
    console.log('test')
}
// 暴露数据
module.exports={
    test,
    hello
}
// exports暴露数据
exports.test=test
exports.hello=hello

// 1、module.exports 可以暴露`任意`数据
module.exports='123'
module.exports='iloveU'

// 2、不能使用 `exports = value`的形式暴露数据
// exports='iloveU' X

// 因为export=module.exports={}
