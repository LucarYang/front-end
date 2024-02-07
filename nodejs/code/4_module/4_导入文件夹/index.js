/**
 * 伪代码
 * 
*/
function require(file){
    // 1、将相对路径转为绝对路径，定位目标文件
    let absolutePath=path.resolve(__dirname,file)
    // 2、缓存检测
    if(cachs[absolutePath]){
        return cachs[absolutePath]
    }
    // 3、读取目标文件代码
    let code=fs.readFileSync(absolutePath).toString()
    // 4、包裹一个函数执行（自执行函数）。通过arguments.callee.toString()查看自执行函数
    let module={}
    let exports=modele.exports={}
    (function(exports,require,modele,__filename,__dirname){
        const test={
            name:'测试'
        }
        mudule.exports=test
        // 输出
        console.log(arguments.callee.toString())
    })(exports,require,modele,__filename,__dirname)
    // 5、缓存模块的值
    cachs[absolutePath]=modele.exports
    // 6、返回module.exports的值
    return modele.exports
}
