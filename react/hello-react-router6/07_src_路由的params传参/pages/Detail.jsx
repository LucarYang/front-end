import React from 'react'
import{useParams,useMatch} from 'react-router-dom'

export default function Detail() {
    const p=useParams()
    // console.log(p,useMatch('/home/message/detail/:id/:title/:content'))
    const {id,title,content}=useParams()
  return (
    <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{content}</li>
    </ul>
  )
}
