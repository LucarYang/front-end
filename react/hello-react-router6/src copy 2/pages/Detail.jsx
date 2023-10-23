import React from 'react'
import{useLocation} from 'react-router-dom'

export default function Detail() {
    const {state:{id,title,content}}=useLocation()
    console.log(useLocation())
  return (
    <ul>
        detail
        <li>{id}</li>
        <li>{title}</li>
        <li>{content}</li>
    </ul>
  )
}
