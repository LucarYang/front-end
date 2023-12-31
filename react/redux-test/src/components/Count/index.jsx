import React, { Component } from 'react'


export default class Count extends Component {
	state = { count: 0 }

	

	//加法
	increment = () => {
		const { value } = this.selectNumber
		console.log(this.props)
		this.props.jia(value*1)
	}
	//减法
	decrement = () => {
		const { value } = this.selectNumber
		this.props.jian(value*1)
	}
	//奇数再加
	incrementIfOdd = () => {
		const { value } = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.jia(value*1)
		}
	}
	//异步加
	incrementAsync = () => {
		const { value } = this.selectNumber
		this.props.jiaAsync(value*1,500)
	}

	render() {
		console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h2>当前求和为:{this.props.count}</h2>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;

				<button onClick={this.decrement}>-</button>&nbsp;

				<button onClick={this.incrementIfOdd}>为奇数的加</button>&nbsp;

				<button onClick={this.incrementAsync}>异步加</button>
			</div>
		)
	}
}
