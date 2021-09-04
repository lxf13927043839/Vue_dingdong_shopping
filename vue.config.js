// postcss.config.js，vant适配rem
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  //配置 运行和打包时的文件路径
  publicPath:process.env.NODE_ENV==='production'?'./':'/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      },
    }
  }
}
