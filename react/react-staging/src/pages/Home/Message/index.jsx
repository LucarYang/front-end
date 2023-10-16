import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Detail from './Detail'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'

export default class Message extends Component {
    state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}
  render() {
    
		const {messageArr} = this.state
    return (
        <div>
        <ul>
        {
            messageArr.map((msgObj)=>{
                return (
                    <li key={msgObj.id}>
                        {/* 向路由组件传递params参数 */}
                        {/* <a href='/xxx'>{msgObj.title}</a> */}
                        <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                    </li>
                )
            })
        }
        </ul>
        <hr/>
        <Route path='/home/message/detail/:id/:title' component={Detail}/>
      </div>
    )
  }
}
