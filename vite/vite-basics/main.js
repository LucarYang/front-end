import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { count } from './count'
import { foo } from './foo'

foo()
console.log('main.module.')

if(import.meta.hot){
  import.meta.hot.accept(('./foo.js'),(newFoo)=>{
    if(newFoo.cacho.amount>5){
      import.meta.hot.invalidate()
    }else{
      newFoo.foo()
    }
  })

  // import.meta.hot.accept()
  import.meta.hot.decline()
}

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
