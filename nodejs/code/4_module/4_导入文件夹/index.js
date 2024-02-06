// 伪代码
function test(){
    console.log('test 测试')
}
mudule.exports=test

// 输出
console.log(arguments.callee.toString())

(function(exports,require,modele,__filename,__drename){
    const test={
        name:'测试'
    }
})