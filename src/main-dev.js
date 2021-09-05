import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件的配置
import './VantConfig.js'
// 适配rem，配置基准值，以37.5
import 'amfe-flexible'
// 导入全局样式
import './assets/css/globalStyle.css'

// 导入mock，模拟后台接口
import './mock/mockData.js'

// 导入vue瀑布流插件
import waterfall from 'vue-waterfall2'

import attachFastClick from 'fastclick'

// 导入axios
import axios from 'axios'
// const BASE_URL = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/'
const BASE_URL = 'http://www.lixiufeng.com/'
axios.defaults.baseURL = BASE_URL
// 把axios挂载到vue的$http中
Vue.prototype.$http = axios

// 处理click在移动的点透和延迟300ms的问题
attachFastClick.attach(document.body)

Vue.config.productionTip = false

Vue.use(waterfall)

// 使用 vue-i18n 切换中英文
import VueI18n from 'vue-i18n'
import zhMessage from './assets/i18n/zh.js'
import enMessage from './assets/i18n/en.js'
import { getLanguage } from './assets/i18n/getLanguage.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
  // 语言标识
  locale: getLanguage(),
  messages: {
      'zh-CN': zhMessage,
      'en-US': enMessage
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// console.log(window.navigator)