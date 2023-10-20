import React, { Component } from 'react'

export default class Child extends Component {
    state={
        users:'',
        users1:[
            {id:'01',name:'tom',age:19},
            {id:'02',name:'jeck',age:19},
            {id:'03',name:'peiqi',age:19},
        ]
    }
  render() {
    return (
      <div>
        <h2>我是Child</h2>
        {
            this.state.users.map((userObj)=>{
                return <h4 key={userObj.id}>{userObj.name}---{userObj.age}</h4>
            })
        }
      </div>
    )
  }
}
