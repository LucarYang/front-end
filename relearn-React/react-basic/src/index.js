// 项目入口 从这里开始运行

// React必要的两个核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入项目跟组件
import App from './App';

// 把App跟组件渲染到Id为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

