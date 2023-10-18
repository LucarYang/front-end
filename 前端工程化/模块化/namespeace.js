// 模块化即对象化
var MyApp = {
  score: 10,
  add: function (a, b) {
    return a + b
  }
}
var sum = MyApp.add(1, 2)
console.log(sum)

//------------------------------------------------------------
sum.score;
// 违反了迪米特法则
// 迪米特法则（Law of Demeter）又叫作最少知识原则（The Least Knowledge Principle），一个类对于其他类知道的越少越好，就是说一个对象应当对其他对象有尽可能少的了解,只和朋友通信，不和陌生人说话。英文简写为: LOD。
