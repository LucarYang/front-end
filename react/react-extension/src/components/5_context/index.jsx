import React, { Component } from 'react'
import './index.css'

//创建Context对象
const MyContext=React.createContext()
const {Provider,Consumer} = MyContext

export default class Demo extends Component {
    state={username:'Tom',age:18}
    render() {
        const {username,age}=this.state
      return (
        <div className="parent">
            <h2>我是A组件</h2>
            <h4>我的用户名{this.state.username}</h4>
            <Provider value={{username,age}}>
                <B/>
            </Provider>
        </div>
      )
    }
  }

export class B extends Component {
    render() {
        return (
            <div className="child">
                <h2>我是B组件</h2>
                <h4>我从A组件接收到用户名:{}</h4>
                <C/>
            </div>
        )
    }
}

//第一种方式:仅适用于类组件 
// export class C extends Component {
//     static contextType = MyContext
//     render() {
//         console.log(this)
//         const {username,age} = this.context
//         return (
//             <div className="grand">
//                 <h2>我是B组件</h2>
//                 <h4>我从A组件接收到用户名:{username},年龄是{age}</h4>
//             </div>
//         )
//     }
// }

//第二种方式: 函数组件与类组件都可以
function C(){
    return (
            <div className="grand">
                <h2>我是B组件</h2>
                <h4>我从A组件接收到用户名:
                <Consumer>
                    {value => `${value.username},年龄是${value.age}`}
                </Consumer>
                </h4>
            </div>
        )
}
export class Demo1 extends Component {
  render() {
    return (
      <div>Demo</div>
    )
  }
}
