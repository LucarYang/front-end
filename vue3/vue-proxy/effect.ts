let activeEffect;
export const effect=(fn:Function)=>{
    const _effect=function(){
        activeEffect=_effect
        fn()
    }
    _effect()
}

const trackMap=new WeakMap()
export const track=(target,key)=>{
    let depsMap=trackMap.get(target)
    if(depsMap){
        depsMap=new Map()
        target.set(target,depsMap)
    }
    let deps=depsMap.get(key)
    if(deps){
        deps=new Set()
        depsMap.set(key,deps)
    }

    deps.add(activeEffect)
}

export const trigger=(target,key)=>{
    let depsMap=trackMap.get(target)
    let deps=depsMap.get(key)
    deps.forEach(effect => effect());
}