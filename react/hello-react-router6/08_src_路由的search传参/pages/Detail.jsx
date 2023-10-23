import React from 'react'
import{useSearchParams,useLocation} from 'react-router-dom'

export default function Detail() {
    const [search,setSearch]=useSearchParams()
    const id=search.get('id')
    const title=search.get('title')
    const content=search.get('content')
    const X=useLocation()
    console.log(X)
  return (
    <ul>
        <button onClick={()=>setSearch('id=05&title=消息101&content=哈哈setSearch哈好')}>setSearch-BTN</button>
        <li>{id}</li>
        <li>{title}</li>
        <li>{content}</li>
    </ul>
  )
}
