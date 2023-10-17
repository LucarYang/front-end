// 该文件是用于创建一个为Count组件服务的reducer,reducer的本质就是一个函数 
const initState = 0
export default function conutReducer(preState = initState, action) {
    // if(preState===undefined)preState=0;
    const { type, data } = action
    switch (type) {
        case 'increment':
            return preState + data
        case 'decrement':
            return preState - data
        default://初始化的时候
            return preState
    }
}