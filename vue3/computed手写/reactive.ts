export const reactive = <T extends object>(target:T) => {
    return new Proxy(target,{
        get (target,key,receiver) {
          const res  = Reflect.get(target,key,receiver) as object
 
 
          return res
        },
        set (target,key,value,receiver) {
           const res = Reflect.set(target,key,value,receiver)
 
 
           return res
        }
    })
}