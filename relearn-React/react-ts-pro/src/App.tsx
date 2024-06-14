// 根据初始值自动推断
// 场景 > 明确的初始值

import { useState } from "react"
type User = {
  name: string
  age: number
}


function App() {
  // 限制初始值
  // const [user, setUser] = useState<User>({
  //   name: 'jack',
  //   age: 12
  // })

  const [user, setUser] = useState<User>(() => {
    return {
      name: 'jack',
      age: 12
    }
  })

  const changeUser = () => {
    setUser(() => ({
      name: 'Tom',
      age: 12
    }))
  }
  return (
    <>
      <div> this is app {user.name}</div>
    </>
  )
}

export default App
