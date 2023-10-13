import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import './index.css'

export default class List extends Component {
     //初始化状态
    state={
        users:[],//
        isFirst:true,
        isLoading:false,
        err:''
    }

    componentDidMount(){
        this.token=Pubsub.subscribe('myNews',(msg,stateObj)=>{
            this.setState(stateObj)
        })
    }

    componentWillUnmount(){
        Pubsub.unsubscribe(this.token)
    }

    render() {
        // const {users,isFirst,isLoading,err}=this.props
        const {users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst?<h2>迎使用，输入关键字，随后点击搜索</h2>:
                    isLoading?<h2>Loading</h2>:
                    err?<h2 style={{color:'red'}}>{err}</h2>:
                    users.length<=0?<h2 style={{color:'red'}}>没数据</h2>:
                    users.map((userObj)=>{
                        return(
                            <div className="card" key={userObj.id}>
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt='head_portrait' src={userObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}
