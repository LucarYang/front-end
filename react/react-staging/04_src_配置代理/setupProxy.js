// const proxy = require('http-proxy-middleware')

// module.exports = function(app){
// 	app.use(
// 		proxy('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
// 			target:'http://localhost:5000', //请求转发给谁
// 			changeOrigin:true,//控制服务器收到的请求头中Host的值
// 			pathRewrite:{'^/api1':''} //重写请求路径(必须)
// 		}),
// 		proxy('/api2',{
// 			target:'http://localhost:5001',
// 			changeOrigin:true,
// 			pathRewrite:{'^/api2':''}	
// 		}),
// 	)
// }

const { createProxyMiddleware } = require('http-proxy-middleware');  
  
module.exports = function(app) {  

  const proxy = createProxyMiddleware({  
    target: 'http://localhost:5000', // 目标服务器的URL  
    changeOrigin: true, // 如果需要跨域请求，则设置此选项为true  
	pathRewrite:{'^/api1':''} //重写请求路径(必须)
  });  

  const proxy2 = createProxyMiddleware({  
    target: 'http://localhost:5001', // 目标服务器的URL  
    changeOrigin: true, // 如果需要跨域请求，则设置此选项为true  
	pathRewrite:{'^/api2':''} //重写请求路径(必须)
  });  

  app.use('/api1', proxy); 
  
  app.use('/api2', proxy2); 
};