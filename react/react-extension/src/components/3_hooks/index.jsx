import React from 'react'
import ReactDOM  from 'react-dom'

/**
class Demo extends React.Component {
    state={count:0}
    add=()=>{
        this.setState((state)=>({count:state.count+1}))
    }
    componentDidMount(){
		this.timer = setInterval(()=>{
			this.setState( state => ({count:state.count+1}))
		},1000)
	}
    render() {
        return (
        <div>
            <h2>num:{this.state.count}</h2>
            <button onClick={this.add}>add</button>
        </div>
        )
    }
}*/


function Demo(){
	// console.log('Demo');
    const [count,setCount] = React.useState(0)
    const myRef = React.useRef()


    React.useEffect(()=>{
        let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)
        return ()=>{
			clearInterval(timer)
		}
    },[])
    // add回调
    function add(){
        //setCount(count+1) //第一种写法
        setCount(count => count+1 )
    }

    function show(){
        alert(myRef.current.value)
    }

    function unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }
    return(
        <div>
            <input type="text" ref={myRef}/>
            <h2>当前求和为{count}</h2>
            <button onClick={add}>add</button>
            <button onClick={unmount}>卸载组件</button>
            <button onClick={show}>点我提示数据</button>
        </div>
    )
}
export default Demo