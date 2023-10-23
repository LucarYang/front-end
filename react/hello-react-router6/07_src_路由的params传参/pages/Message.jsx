import React, { useState } from 'react'
import {Link, Outlet} from 'react-router-dom'

export default function Message() {
  const [message]=useState([
    {id:'01',title:'消息01',content:'锄禾日当午'},
    {id:'02',title:'消息02',content:'汗滴禾下土'},
    {id:'03',title:'消息03',content:'谁知盘中餐'},
    {id:'04',title:'消息04',content:'粒粒皆辛苦'},
  ])
  return (
    <div>
    <ul>
      {
        message.map((m)=>{
          return(
            <li key={m.id}>
              <Link to={`./detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link>
            </li>
          )
        })
      }
    </ul>
    <hr/>
    <Outlet/>
  </div>
  )
}
