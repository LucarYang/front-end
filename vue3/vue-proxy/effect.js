"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trigger = exports.track = exports.effect = void 0;
// effect track trigger, 实现effect 副作用函数
// 使用一个全局变量 active 收集当前副作用函数，并且初始化的时候调用一下
let activeEffect;
const effect = (fn) => {
    const _effect = function () {
        activeEffect = _effect;
        fn();
    };
    _effect();
};
exports.effect = effect;
// 实现track,收集依赖
const targetMap = new WeakMap();
const track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) { // 第一次无值,对应value是一个Map
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    // 对象取value
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    // 收集副作用依赖
    deps.add(activeEffect);
};
exports.track = track;
// 触发依赖
const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);
    deps.forEach(effect => effect());
};
exports.trigger = trigger;
