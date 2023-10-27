import React from 'react'
import { useNavigationType,useResolvedPath } from 'react-router-dom'

export default function News() {
  console.log(useNavigationType())//f返回当前的导航类型useNavigationTypeL: 返回值:push pop(刷新页面) replace
  console.log(useResolvedPath('/use?id=001&name=liming')) //解析路径
  return (
  <div>News</div>
  )
}
