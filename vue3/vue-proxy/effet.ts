// effect track trigger, 实现effect 副作用函数
// 使用一个全局变量 active 收集当前副作用函数，并且初始化的时候调用一下
let activeEffect: any;
export const effect = (fn:Function) => {
     const _effect = function () {
        activeEffect = _effect;
        fn()
     }
     _effect()
}
// 实现track,收集依赖
const targetMap = new WeakMap()
export const track = (target: any,key: any) =>{
   let depsMap = targetMap.get(target)
   if(!depsMap){// 第一次无值,对应value是一个Map
       depsMap = new Map()
       targetMap.set(target,depsMap)
   }
  // 对象取value
   let deps = depsMap.get(key)
   if(!deps){
      deps = new Set()
      depsMap.set(key,deps)
   }
   // 收集副作用依赖
   deps.add(activeEffect)
}
// 触发依赖
export const trigger = (target: any,key: any) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  deps.forEach(effect=>effect())
}