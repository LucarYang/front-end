var MyApp = (function () {
  var score = 10;
  return {
    add: function (a, b) {
      return a + b
    }
  };
})()
var sum = MyApp.add(1, 2)
console.log(sum)

// 模块的依赖注入
MyApp.score //无法修改