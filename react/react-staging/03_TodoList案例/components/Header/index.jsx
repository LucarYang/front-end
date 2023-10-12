import React, { Component } from 'react'
import PropTypes from "prop-types"
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {
    // 对接收的props进行：类型、必要性的限制
    static propTypes={
        addTodo:PropTypes.func.isRequired
    }

    // 键盘事件的回调
    handleKeyUp=(event)=>{
        const {keyCode,target}=event
        if(keyCode===13){
            // console.log(event.target.value,event.keyCode)
            if(target.value.trim()===''){
                alert('输入不为空')
                return
            } 
            const todoObj={
                id:nanoid(),
                name:target.value,
                done:false
            }
            this.props.addTodo(todoObj)
            target.value=''

        }
    }
  render() {
    return (
        <div className="todo-header">
            <input type="text" onKeyUp={this.handleKeyUp} placeholder="请输入你的任务名称，按回车键确认"/>
        </div>
    )
  }
}
