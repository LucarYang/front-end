import React, { PureComponent } from 'react'
import './index.css'

export default class Parent extends PureComponent {
    state = {carName:"奔驰c36",stus:['小张','小李','小王']}

    changeCar=()=>{
        this.setState({carName:'BYD'})
        
        const {stus} = this.state
		this.setState({stus:['小刘',...stus]})
    }

    /**shouldComponentUpdate(nextProps,nextState){
		console.log(this.props,this.state); //目前的props和state
		console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.state.carName === nextState.carName//true// 
	}*/
    render() {
        const {carName}=this.state
        return (
        <div className="parent">
            <h3>我是Parent</h3>{this.state.stus}&nbsp;
            <span>我的car:{this.state.carName}</span><br/>
            <button onClick={this.changeCar}>换车</button>
            <Child carName={carName}/>
        </div>
        )
    }
    }
    class Child extends PureComponent{
        /**shouldComponentUpdate(nextProps,nextState){
            console.log(this.props,this.state); //目前的props和state
            console.log(nextProps,nextState); //接下要变化的目标props，目标state
            return !this.props.carName === nextProps.carName //true//
        }*/
        render(){
            return(
                <div className="child">
                    <h3>我是Child</h3>
                    <span>我接到的车是：{this.props.carName}</span>
                </div>
            )
        }
    }
