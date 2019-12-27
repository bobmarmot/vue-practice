module.exports = {
  devServer: {
   proxy:{
     '/api':{
       target:'http://127.0.0.1:3000',
       ws:true,
       changeOrigin:true
     }
   }
  }
}
// 代理服务器解决跨域