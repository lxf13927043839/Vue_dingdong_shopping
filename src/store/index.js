import Vue from 'vue'
import Vuex from 'vuex'
import { findIndexFromList } from '../assets/js/shopCar.js'
Vue.use(Vuex)

/*
  当页面刷新的时候需要重新获取数据，数据是存放在sessionStorage中，
  不要在页面中去初始化，这样不知道用户刷新的是哪个页面不好处理
*/
// 初始化购物车数据
function _initSelectProduct () {
  var productInfo = JSON.parse(window.sessionStorage.getItem('productInfo'))
  // 如果没有存储则跳出方法就可以，传个空值的初始化，当你去读取null的属性会报错的
  if (!productInfo) {
    return []
  }
  return productInfo
}
// 初始化用户信息
function _initUserInfo () {
  var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
  if (userInfo === null) {
    return {}
  }
  return userInfo
}
// 初始化用户登录状态
function _initLoginState () {
  var loginState = window.sessionStorage.getItem('loginState')
  // 没有的话为null,返回false
  if (loginState === null) {
    return false
  }
  // 页面刷新后，vuex中的数据都是空的，要设置一下用户是否登录了，会影响其他数据的显示
  // 注意在sessionStorag中获取的值是字符串，Boolean处理字符串都是true，不适用，直接判断了
  if (loginState === 'true') {
    return true
  } else {
    return false
  }
}
// 初始化用户的地址信息
function _initAddressInfo () {
  var addressInfo = JSON.parse(window.sessionStorage.getItem('userAddress'))
  if (addressInfo === null) {
    return []
  }
  // console.log(addressInfo[0].isDefault, typeof addressInfo[0].isDefault)
  return addressInfo
}
// 确认唯一的默认地址,根据索引来确认
// 1、添加地址时候，只要判断新加的那个，就是最后的所以
// 2、修改地址时候，是能获得索引的
function _checkOnlyDefault (address, index) {
  if (address[index].isDefault) {
    address.forEach((item) => {
      item.isDefault = false
    })
    address[index].isDefault = true
  }
}

// 把信息同步至sessionStorage中
function updateSessionStorage (itemName, value) {
  // 数据添加的变化同步到sessionStorage中去
  var dataStr = JSON.stringify(value)
  // console.log(dataStr)
  window.sessionStorage.setItem(itemName, dataStr)
}

export default new Vuex.Store({
  state: {
    // 用户注册的信息,在“我的”页面，和修改也页面
    userInfo: _initUserInfo(),
    // 用户登录状态
    loginState: _initLoginState(),
    // 用户保存的地址
    userAddress: _initAddressInfo(),
    // 用户选中的商品列表
    selectProduct: _initSelectProduct(),
    // 购物车tabbar的位置,相对于屏幕的位置
    shopCarPosition: {
      x: 0,
      y: 0
    },
    // 别的地方会修改tabbar导航
    vuexTabbarIndex: -1
  },
  mutations: {
    // 页面刷新时候初始化用户信息，
    initUserInfo (state, info) {
      state.userInfo = info
    },
    // 注册时设置用户信息
    setUserInfo (state, info) {
      state.userInfo = info
      state.loginState = true
      // 把信息存放至sessionStorage中
      window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      window.sessionStorage.setItem('loginState', state.loginState)
    },
    // 添加用户地址
    addUserAddress (state, add) {
      state.userAddress.push(add)
      _checkOnlyDefault(state.userAddress, state.userAddress.length - 1)
      updateSessionStorage('userAddress', state.userAddress)
    },
    upDateAddress (state, val) {
      state.userAddress[val.index] = val.address
      _checkOnlyDefault(state.userAddress, val.index)
      updateSessionStorage('userAddress', state.userAddress)
    },
    deleteAddress (state, index) {
      state.userAddress.splice(index, 1)
      updateSessionStorage('userAddress', state.userAddress)
    },
    /*
      添加购物车中的商品
      如果索引返回 -1，说明它是一个新添加的商品，否则说明该商品已经加入购物车中
    */
    addShopProduct (state, item) {
      var isExist = findIndexFromList(state.selectProduct, item.id)
      if (isExist === -1) {
        // 新添加
        state.selectProduct.push(item)
      } else {
        state.selectProduct[isExist].num++
      }
      // 数据添加的变化同步到sessionStorage中去
      var dataStr = JSON.stringify(state.selectProduct)
      // console.log(dataStr)
      window.sessionStorage.setItem('productInfo', dataStr)
    },
    // 商品数量加1,传入索引就可以
    createProduct (state, index) {
      if (index < 0 || index >= state.selectProduct.length) {
        console.log('index的值超出范围')
        return -1
      }
      state.selectProduct[index].num++
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 商品数量减1,根据索引
    decreateProduct (state, index) {
      if (index < 0 && index >= state.selectProduct.length) {
        console.log('index的值超出范围')
        return -1
      }
      state.selectProduct[index].num--
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 删除商品，根据索引
    deleteProduct (state, index) {
      if (index < 0 || index >= state.selectProduct.length) {
        console.log('index的值超出范围')
        return -1
      }
      state.selectProduct.splice(index, 1)
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 更新商品数量，根据索引
    updateProduct (state, val) {
      if (val.index < 0 || val.index >= state.selectProduct.length) {
        console.log('index的值超出范围')
        return -1
      }
      state.selectProduct[val.index].num = val.num
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 在购物车勾选上的商品,直接取反就可以，第一次点，true，第二次不选，就false了
    setCheckProduct (state, index) {
      if (index < 0 || index >= state.selectProduct.length) {
        console.log('index的值超出范围')
        return -1
      }
      state.selectProduct[index].checked = !state.selectProduct[index].checked
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 设置全选
    setCheckAllProduct (state) {
      state.selectProduct.forEach(function (item) {
        item.checked = true
      })
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 设置全不选
    cancelCheckAllProduct (state) {
      state.selectProduct.forEach(function (item) {
        item.checked = false
      })
    },
    // 删除选中的部分
    deleteCheckProduct (state) {
      var length = state.selectProduct.length
      // 从后往前，使用splice删除数组的元素，这样不用处理下标
      for (var i = length - 1; i >= 0; i--) {
        if (state.selectProduct[i].checked) {
          state.selectProduct.splice(i, 1)
        }
      }
      updateSessionStorage('productInfo', state.selectProduct)
    },
    // 设置购物车的坐标
   setShopCarPosition (state, pos) {
     state.shopCarPosition.x = pos.x
     state.shopCarPosition.y = pos.y
   },
   // 登录成功
   successLogin (state) {
     state.loginState = true
     window.sessionStorage.setItem('loginState', state.loginState)
   },
   // 退出登录
   exitLogin (state) {
     state.loginState = false
     window.sessionStorage.setItem('loginState', state.loginState)
   },
   // 在购物车页面,去逛逛、和首页的分类图标、需要修改导航,他会在home页面进行写入sessionStorage同步
   changeTabbarIndex (state, index) {
     state.vuexTabbarIndex = index
   }
  },
  getters: {
    totalProductNum: function (state) {
      var total = 0
      // console.log(state.selectProduct)
      if (state.selectProduct.length > 0) {
        state.selectProduct.forEach(function (item) {
          total += item.num
        })
      }
      return total
    },
    // 在vant订单组件那一块他的单位是分，要把结果x100
    totalPay: function (state) {
      var totalPay = 0
      state.selectProduct.forEach(function (item) {
        if (item.checked) {
          totalPay += item.num * item.price
        }
      })
      totalPay = totalPay.toFixed(2)
      return (totalPay * 100)
    },
    // 获取购物车的坐标
    getShopCarPosition: function (state) {
      return {
        x: state.shopCarPosition.x,
        y: state.shopCarPosition.y
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
