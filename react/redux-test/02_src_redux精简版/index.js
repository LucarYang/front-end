import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import store from "./redux/store";

ReactDOM.render(<App />, document.getElementById('root'))
store.subsribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})