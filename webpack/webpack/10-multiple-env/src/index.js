import _ from 'lodash';
import Notes from "./accet/data.csv";
import josn from './accet/data.json5';
import toml from './accet/data.toml';
import Data from "./accet/data.xml";
import yaml from './accet/data.yaml';
import exampleTxt from './accet/example.txt';
import imgsrc from './accet/lbxx.png';
import logSvg from './accet/u899_seg1.svg';
import hello from "./hello";
import './style.css';
import './style.less';
console.log(_.join(['index', 'module', 'loaded!'], ' '))

import './async-module.js';
hello()

const img = document.createElement('img')
img.style.cssText = 'width:100px;height:100px'
img.src = imgsrc
document.body.appendChild(img)

const img2 = document.createElement('img')
img2.style.cssText = 'width:100px;height:100px'
img2.src = logSvg
document.body.appendChild(img2)

const block = document.createElement('div')
block.style.cssText = 'width:400px;height:300px;background:aliceblue;'
block.classList.add('block-bg')
block.textContent = exampleTxt
document.body.appendChild(block)

document.body.classList.add('hello')

const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = '&#xe668';
document.body.appendChild(span)

console.log(Data)
console.log(Notes)

console.log(toml.title)
console.log(toml)
console.log(yaml.title)
console.log(yaml)
console.log(josn.title)
console.log(josn)


const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click', () => {
  import(/*webpackChunkName:'math',webpackPrefetch:true*/'./math.js').then(({ add }) => { //webpackChunkName魔法注释 webpackPrefetch:true 预加载 webpackPreload:true
    console.log(add(1, 2))
  })
})

document.body.appendChild(button)