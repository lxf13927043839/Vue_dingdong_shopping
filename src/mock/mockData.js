/*
  通过mock来模拟所有的后端数据接口
  涉及get、post
*/
import Mock from 'mockjs'
import homeApi from './api/homeApi.json'
import homeApiCategories from './api/homeApi/categories.json'
import categoriesdetail1 from './api/homeApi/categoriesdetail/lk001.json'
import categoriesdetail2 from './api/homeApi/categoriesdetail/lk002.json'
import categoriesdetail3 from './api/homeApi/categoriesdetail/lk003.json'
import categoriesdetail4 from './api/homeApi/categoriesdetail/lk004.json'
import categoriesdetail5 from './api/homeApi/categoriesdetail/lk005.json'
import categoriesdetail6 from './api/homeApi/categoriesdetail/lk006.json'
import categoriesdetail7 from './api/homeApi/categoriesdetail/lk007.json'
import categoriesdetail8 from './api/homeApi/categoriesdetail/lk008.json'
import categoriesdetail9 from './api/homeApi/categoriesdetail/lk009.json'
import categoriesdetail10 from './api/homeApi/categoriesdetail/lk010.json'
import categoriesdetail11 from './api/homeApi/categoriesdetail/lk011.json'
import categoriesdetail12 from './api/homeApi/categoriesdetail/lk012.json'
import categoriesdetail13 from './api/homeApi/categoriesdetail/lk013.json'
import categoriesdetail14 from './api/homeApi/categoriesdetail/lk014.json'
import categoriesdetail15 from './api/homeApi/categoriesdetail/lk015.json'
import categoriesdetail16 from './api/homeApi/categoriesdetail/lk016.json'
import categoriesdetail17 from './api/homeApi/categoriesdetail/lk017.json'
import categoriesdetail18 from './api/homeApi/categoriesdetail/lk018.json'

import recipeAllScene from './api/recipe/allScene.json'
import menulistlk1 from './api/recipe/menulist/lk01.json'
import menulistlk2 from './api/recipe/menulist/lk02.json'
import menulistlk3 from './api/recipe/menulist/lk03.json'
import menulistlk4 from './api/recipe/menulist/lk04.json'
import menulistlk5 from './api/recipe/menulist/lk05.json'
import menulistlk6 from './api/recipe/menulist/lk06.json'
import menulistlk7 from './api/recipe/menulist/lk07.json'
import menulistlk8 from './api/recipe/menulist/lk08.json'
import menulistlk9 from './api/recipe/menulist/lk09.json'
import menulistlk10 from './api/recipe/menulist/lk10.json'
import menulistlk11 from './api/recipe/menulist/lk11.json'
import menulistlk12 from './api/recipe/menulist/lk12.json'
import menulistlk13 from './api/recipe/menulist/lk13.json'
import menulistlk14 from './api/recipe/menulist/lk14.json'
import menulistlk15 from './api/recipe/menulist/lk15.json'
import menulistlk16 from './api/recipe/menulist/lk16.json'
import menulistlk17 from './api/recipe/menulist/lk17.json'
import menulistlk18 from './api/recipe/menulist/lk18.json'
import menulistlk19 from './api/recipe/menulist/lk19.json'
import menulistlk20 from './api/recipe/menulist/lk20.json'
import menulistlk21 from './api/recipe/menulist/lk21.json'
import menulistlk22 from './api/recipe/menulist/lk22.json'
import menulistlk23 from './api/recipe/menulist/lk23.json'
import menulistlk24 from './api/recipe/menulist/lk24.json'
import menulistlk25 from './api/recipe/menulist/lk25.json'
import menulistlk26 from './api/recipe/menulist/lk26.json'
import menulistlk27 from './api/recipe/menulist/lk27.json'
import menulistlk28 from './api/recipe/menulist/lk28.json'
import menulistlk29 from './api/recipe/menulist/lk29.json'
import menulistlk30 from './api/recipe/menulist/lk30.json'
import menulistlk31 from './api/recipe/menulist/lk31.json'

import youLike from './api/cart/youlike.json'

import sendCode from './api/send_code.json'

import vip from './api/vip.json'

Mock.mock('http://www.lixiufeng.com/homeApi', homeApi)
Mock.mock('http://www.lixiufeng.com/homeApi/categories', homeApiCategories)

Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk001', categoriesdetail1)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk002', categoriesdetail2)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk003', categoriesdetail3)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk004', categoriesdetail4)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk005', categoriesdetail5)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk006', categoriesdetail6)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk007', categoriesdetail7)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk008', categoriesdetail8)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk009', categoriesdetail9)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk010', categoriesdetail10)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk011', categoriesdetail11)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk012', categoriesdetail12)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk013', categoriesdetail13)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk014', categoriesdetail14)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk015', categoriesdetail15)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk016', categoriesdetail16)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk017', categoriesdetail17)
Mock.mock('http://www.lixiufeng.com/homeApi/categoriesdetail/lk018', categoriesdetail18)

Mock.mock('http://www.lixiufeng.com/recipe/allScene', recipeAllScene)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk01', menulistlk1)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk02', menulistlk2)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk03', menulistlk3)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk04', menulistlk4)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk05', menulistlk5)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk06', menulistlk6)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk07', menulistlk7)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk08', menulistlk8)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk09', menulistlk9)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk10', menulistlk10)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk11', menulistlk11)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk12', menulistlk12)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk13', menulistlk13)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk14', menulistlk14)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk15', menulistlk15)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk16', menulistlk16)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk17', menulistlk17)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk18', menulistlk18)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk19', menulistlk19)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk20', menulistlk20)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk21', menulistlk21)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk22', menulistlk22)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk23', menulistlk23)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk24', menulistlk24)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk25', menulistlk25)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk26', menulistlk26)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk27', menulistlk27)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk28', menulistlk28)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk29', menulistlk29)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk30', menulistlk30)
Mock.mock('http://www.lixiufeng.com/recipe/menulist/lk31', menulistlk31)

Mock.mock('http://www.lixiufeng.com/cart/youlike', youLike)

Mock.mock('http://www.lixiufeng.com/vip', vip)

// 通过Mock.mock函数模拟post验证码请求
Mock.mock('http://www.lixiufeng.com/sendCode', 'post', function (option) {
  // 这里的option是请求的相关参数
  console.log(option)
  return Mock.mock(sendCode)
})

// 通过Mock.mock函数模拟post登录请求
// 直接在json文件中，只能写字符串，写json解析会报错，他的本意当成一个对象来使用,请求发送过来的数据都是字符串的，所以body的数据进行解析一下
Mock.mock('http://www.lixiufeng.com/login_code', 'post', function (option) {
  // 这里的option是请求的相关参数
  console.log(option)
  var loginCode = {
    success_code: 200,
    message: '登录成功',
    data: {
      token: '3412341234ahcnhjyues1787654ad',
      user_id: '001',
      user_name: 'KMZ',
      sex: '',
      birthday: '',
      phone: JSON.parse(option.body).phone,
      password: JSON.parse(option.body).password
    }
  }
  return Mock.mock(loginCode)
})
