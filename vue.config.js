// postcss.config.js，vant适配rem
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  //配置 运行和打包时的文件路径
  publicPath:process.env.NODE_ENV==='production'?'./':'/',
  // 项目发布配置，通过链式操作
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js' )
      config.set('externals', {
        vue: 'Vue',
        'vue-router' : 'VueRouter',
        axios: 'axios',
        vuex: 'Vuex',
        // 这两个用的exports，识别不了，暂时不知道配置哪里能处理
        // 'vue-waterfall2': 'waterfall',
        // fastclick: 'attachFastClick',
        'vue-i18n': 'VueI18n',
        mockjs: 'Mock',
        // 这里一直设置不了全局，暂时无解
        // 'better-scroll': 'BScroll',
        vant: 'vant'
      })
      // html根据isProd来判断要不要使用cdn
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config. when(process.env.NODE_ENV === 'development' , config => {
      config.entry('app').clear().add('./src/main-dev.js' )
      // html根据isProd来判断要不要使用cdn
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
    // 位置放错了。。。。。
    // 把config.plugin写这里了，也不报错
  },
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
