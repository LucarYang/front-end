import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import store from "./redux/store";

ReactDOM.render(<App />, document.getElementById('root'))
store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})

// import { createRoot } from 'react-dom/client'; 
// import store from "./redux/store"; 
// // ...其他代码...  
// createRoot(<App/>,document.getElementById('root'));
// store.subscribe(() => {
//     createRoot(document.getElementById('root'));
// })
