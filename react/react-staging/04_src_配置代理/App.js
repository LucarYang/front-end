import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  getData=()=>{
    axios.get('http://localhost:3000/api1/students').then(
      response=>{console.log('response',response.data,response)},
      error=>{}
      )
  }

  getCarData=()=>{
    axios.get('http://localhost:3000/api2/cars').then(
      response=>{console.log('response',response.data,response)},
      error=>{}
      )
  }

  render() {
    return (
      <div>
        <button onClick={this.getData}>request - 请求</button>
        <button onClick={this.getCarData}>request - 请求car</button>
      </div>
    )
  }
}
