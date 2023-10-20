import React, { Component } from 'react'
import './index.css'

export default class Parent extends Component {
    render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A render={(name)=><B name={name}/>}/>
			</div>
		)
	}
}

class A extends Component{
    state = {name:'tom'}
    render() {
        console.log(this.props)
        const {name} = this.state
        return (
          <div className='a'>
            <h2>我是A</h2>
            {/* <B/> */}
            {/* {this.props.children} */}
            {this.props.render(name)}
          </div>
        )
      }
}

class B extends Component{
    render() {
        return (
            <div className='b'>
            <h2>我是b</h2>
            {this.props.name}
          </div>
        )
      }
}
