import { createStore } from 'redux' //引入createStore，用于创建redux核心的store组件
import countReducer from './conut_reducer'//引入为count组件服务的reducer  
// 暴露store
export default createStore(countReducer)
