import React, { Component } from 'react'

export default class Demo extends Component {
    state={count:0}

    add=()=>{
        //对象式的setState
        /**
        const { count } = this.state;  
        this.setState({ count: count + 1 },()=>{
            console.log(this.state.count)
        });   */

        //函数式的setState
        // this.setState((state,props)=>{
        //     console.log(state,props) //可以拿到state props
        //     return {count:state.count+1}
        // })
        this.setState(state=>({count:state.count+1}))
    }

    render() {
        return (
        <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.add}>add</button>
        </div>
        )
    }
}
