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