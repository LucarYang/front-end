import exampleTxt from './accet/example.txt';
import imgsrc from './accet/lbxx.png';
import logSvg from './accet/u899_seg1.svg';
import hello from "./hello";
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
block.style.cssText = 'width:400px;height:30px;background:aliceblue;'
block.textContent = exampleTxt
document.body.appendChild(block)