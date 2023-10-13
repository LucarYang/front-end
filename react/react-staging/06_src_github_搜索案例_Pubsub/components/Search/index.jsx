import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {

    Search=()=>{
		
        //获取用户的输入(连续解构赋值+重命名)
        const {keyWordElement:{value:keyWord}}=this
        // 发送请求前通知List更新状态
        Pubsub.publish('myNews',{isFirst:false,isLoading:true})
        axios.get(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
            response => {
                console.log('success',response.data);
                // 请求成功后通知App更新状态
                Pubsub.publish('myNews',{isLoading:false,users:response.data.items})
            },
            error=>{
                // 失败后通知App更新状态
                Pubsub.publish('myNews',{isLoading:false,err:error.message})
                console.log('error',error)
            }
        )

    }
  render() {
    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
            <input ref={c=>this.keyWordElement=c} type="text" placeholder="enter the name you search"/>&nbsp;
            <button onClick={this.Search}>Search</button>
            </div>
        </section>
    )
  }
}
