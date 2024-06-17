import { useEffect, useRef } from "react";





// 1.获取dom
// 2. 稳定引用的存储器(定时器管理)
function App() {
  const domRef = useRef<HTMLInputElement>(null)
  const timerID = useRef<number | undefined>(undefined)
  useEffect(() => {
    // 可选链 前面不为空值(null /undefined)执行点运算
    // 类型守卫防止出现空值.运算错误
    domRef.current?.focus()
    timerID.current = setInterval(() => {
      console.log('123');
    }, 1000)
    return () => clearInterval(timerID.current)
  }, [])
  return (
    <>
      <input ref={domRef} />
      <div> this is app</div>

    </>
  )
}

export default App
