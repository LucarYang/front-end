import React, { Component } from 'react'
import './App.css'
import Search from './components/Search'
import List from './components/List/inedx'

export default class App extends Component {
  

  // 更新APP的state
  updateAppState=(stateObj)=>{
    this.setState(stateObj)
  }

  render() {
    // const {users}=this.state
    return (
      <div className="container">
      <Search/>
      <List/>
    </div>
    )
  }
}
