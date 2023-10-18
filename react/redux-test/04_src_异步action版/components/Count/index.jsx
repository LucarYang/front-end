import React, { Component } from 'react'
import store from '../../redux/store'
import { createDecrementAction, createIncrementAction,createIncrementAsyncAction } from '../../redux/conut_action'

export default class Count extends Component {
	state = { count: 0 }

	// 监测redux的中状态的变化，只要变化，就调用render
	// componentDidMount() {
	// 	store.subscribe(() => {
	// 		this.setState({})
	// 	})
	// }
	//加法
	increment = () => {
		const { value } = this.selectNumber
		store.dispatch(createIncrementAction(value * 1))
	}
	//减法
	decrement = () => {
		const { value } = this.selectNumber
		store.dispatch(createDecrementAction(value * 1))
	}
	//奇数再加
	incrementIfOdd = () => {
		const { value } = this.selectNumber
		const count = store.getState()
		if (count % 2 !== 0) {
			store.dispatch(createIncrementAction(value * 1))
		}
	}
	//异步加
	incrementAsync = () => {
		const { value } = this.selectNumber
		setTimeout(() => {
			store.dispatch(createIncrementAsyncAction(value * 1),500)
		}, 500)
	}

	render() {
		return (
			<div>
				<h2>当前求和为:{store.getState()}</h2>
				{/* <select ref={c=>this.SelectNumber=c}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
        </select>&nbsp; */}
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
