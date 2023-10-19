import React, { Component } from 'react'
import './index.css'

export default class Parent extends Component {
    state={carname:'奔驰'}

    changeCar=()=>{
        this.setState({carname:'BYD'})
    }
    render() {
        const {carname}=this.state
        return (
        <div className="parent">
            <h3>我是Parent</h3>
            <span>我的car:{this.state.carname}</span><br/>
            <button onClick={this.changeCar}>换车</button>
            <Child/>
        </div>
        )
    }
    }
    class Child extends Component{
        render(){
            return(
                <div className="child">
                    <h3>我是Child</h3>
                </div>
            )
        }
    }
