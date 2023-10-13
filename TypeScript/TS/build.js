const webpack = require('webpack')

function f1() {
  return webpack({
    entry: './Project/common_JS/main.js',
    mode: 'none',
    output: {
      iife: false,
      pathinfo: 'verbose' // verbose: 冗余；尽可能的详细
    }
  })
}

f1().run((err, stat) => {
  console.log('打包')
})