import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
function setVantLanguage (language) {
  if (language === 'zh-CN') {
    Locale.use('zh-CN', zhCN)
  } else if (language === 'en-US') {
    Locale.use('en-US', enUS)
  }
} 
/*
   先从通过navigator获取用户的首先语言，通常是浏览器用户界面的语言。当未知的时，返回null。
   获取不到，则在sessionStorage中设置默认中文
*/
export const getLanguage = function () {
  // 1、先看用户是否有设置过，从sessionStorage中获取，这里不能用const language,它后边有修改
  var language = window.sessionStorage.getItem('language')
  if (language) {
    // 如果有的话就使用
    setVantLanguage(language)
    return language
  }
  // 2、从navigator中获取
  language = window.navigator.language
  if (language) {
    setVantLanguage(language)
    return language
  }
  // 3、前两者如果都没有就在sessionStorage中设置默认中文
  if (!language) {
    window.sessionStorage.setItem('language', 'zh-CN')
    setVantLanguage('zh-CN')
    return 'zh-CN'
  }
  return language
}
