import React,{useState} from 'react'
import { Navigate } from 'react-router-dom'

export default function Home() {
    const [sum,setSum]=useState(1)
  return (
    <div>
    <h2>Home组件内容</h2>
    <div>
      <ul className="nav nav-tabs">
        <li>
          <a className="list-group-item" href="./home-news.html">News</a>
        </li>
        <li>
          <a className="list-group-item active" href="./home-message.html">Message</a>
        </li>
      </ul>
      <div>
        <ul>
          <li>
            <a href="/message1">message001</a>&nbsp;&nbsp;
          </li>
          <li>
            <a href="/message2">message002</a>&nbsp;&nbsp;
          </li>
          <li>
            <a href="/message/3">message003</a>&nbsp;&nbsp;
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}
