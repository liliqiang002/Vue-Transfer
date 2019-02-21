module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://39.107.109.54:9090', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }