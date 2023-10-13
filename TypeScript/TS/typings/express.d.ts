declare module 'express'{
  interface Router{
    get(path:string,cb:(req:any,res:any)=>void):void
  }
  interface App{
    use(path:string,router:any):void
    listen(port:number,cb?:()=>void)
  }
  interface Express{
    ():App
    Router():Router
  }
  const express:Express
  export default express
}

//声明扩充全局变量
declare var a:number 
//扩充函数
declare function expfun(params:type) { 
  
}
//声明扩充类
declare class expclass {
  constructor(parameters) {
    
  }
}
//声明扩充枚举
declare enum epcenum{
  a=1
}
