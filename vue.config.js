
module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://spacegame-377714.lm.r.appspot.com',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  