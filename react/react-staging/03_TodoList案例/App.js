import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
export default class App extends Component {
    // 状态在哪里操作状态的方法就在那里

    // 初始化状态
    state={todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
        {id:'003',name:'敲代码',done:true},
        {id:'004',name:'city wolk',done:false}
    ]}

    //addTodo用于添加一个todo，接收的参数是todo对象
    addTodo=(todoObj)=>{
        //获取原todos
		const {todos} = this.state
		//追加一个todo
		const newTodos = [todoObj,...todos]
		//更新状态
		this.setState({todos:newTodos})
    }

    updateTodo=(id,done)=>{
        const {todos}=this.state
        // 匹配数据
        const newtodos=todos.map((todoObj)=>{
            if(todoObj.id===id) return {...todoObj,done}
            else return todoObj
        })
        this.setState({todos:newtodos})
    }

    deleteTodo=(id)=>{
        const {todos}=this.state
        const newtodos=todos.filter((todoObj)=>{
            return todoObj.id!==id
        })
        this.setState({todos:newtodos})
    }


    checkAll=(done)=>{
        const {todos}=this.state
        const newtodos=todos.map((todoObj)=>{
            return {...todoObj,done:done}
        })
        this.setState({todos:newtodos})
    }

    clearAllDone=()=>{
        const {todos}=this.state
        const newtodos=todos.filter((todoObj)=>{
            return !todoObj.done
        })
        this.setState({todos:newtodos})
    }
    render() {
        const {todos}=this.state
        return (
            <div className="todo-container">
            <div className="todo-wrap">
                <Header addTodo={this.addTodo}/>
                <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                <Footer todos={todos} checkAll={this.checkAll} clearAllDone={this.clearAllDone}/>
            </div>
        </div>
        )
    }
}
