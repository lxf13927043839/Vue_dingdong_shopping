import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/home/Home.vue'
import HomePage from '../view/home/HomePage.vue'
import ProductDetail from '../components/productDetail/ProductDetail.vue'
import Category from '../view/category/Category.vue'
import Eat from '../view/eat/Eat.vue'
import ShopCar from '../view/shopCar/ShopCar.vue'
import Mine from '../view/mine/Mine.vue'
import Login from '../view/login/Login.vue'
import PersonalCenter from '../view/mine/PersonalCenter.vue'
import MyOrder from '../view/mine/MyOrder.vue'
import Coupon from '../view/mine/Coupon.vue'
import MyAddress from '../view/mine/address/MyAddress.vue'
import Addaddress from '../view/mine/address/Addaddress.vue'
import EditAddress from '../view/mine/address/EditAddress.vue'
import Vip from '../view/mine/vip/Vip.vue'
import VipPay from '../view/mine/vip/VipPay.vue'
import Settlement from '../view/shopCar/Settlement.vue'
import EditUserName from '../view/mine/EditUserName.vue'
import ShowProduct from '../view/shopCar/ShowProduct.vue'
import Language from '../view/mine/language/Language.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/home/homepage',
    // 这里homepage作为子路由是不合适的，如果它作为子路由，写法也不是这样子。如果是子路由，那么home组件有router-view
    children: [
      { path: '/home/homepage', component: HomePage },
      // 正确的写法，子路由是不能带 根路径，这个单页面的路由出口router-view，会在home中
      // 注意，访问的时候，/home/category，不要写成 /category
      { path: 'category', component: Category },
      { path: 'eat', component: Eat },
      { path: 'shopcar', component: ShopCar },
      { path: 'mine', component: Mine }
    ]
  },
  {
    path: '/productdetail',
    component: ProductDetail
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/mine/personalcenter',
    component: PersonalCenter
  },
  {
    path: '/mine/myorder',
    component: MyOrder
  },
  {
    path: '/mine/coupon',
    component: Coupon
  },
  {
    path: '/mine/myaddress',
    component: MyAddress
  },
  {
    path: '/mine/addaddress',
    component: Addaddress
  },
  {
    path: '/mine/editaddress',
    component: EditAddress
  },
  {
    path: '/mine/vip',
    component: Vip
  },
  {
    path: '/mine/vippay',
    component: VipPay
  },
  {
    path: '/settlement',
    component: Settlement
  },
  {
    path: '/personalcenter/editusername',
    component: EditUserName
  },
  {
    path: '/settlement/showproduct',
    component: ShowProduct
  },
  {
    path: '/language',
    component: Language
  }
]

const router = new VueRouter({
  routes
})

/*
  路由守卫导航
*/
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题,百度找到的原因，具体原因未知
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  var loginState = window.sessionStorage.getItem('loginState')
  if (loginState === 'false') {
    loginState = false
  } else if(loginState === 'true') {
    loginState = true
  }
  // console.log(loginState)
  var path = to.path
  // console.log(path)
  switch(path) {
    case '/home/homepage':
    case '/home/category':
    case '/home/eat':
    case '/home/shopcar':
    case '/home/mine':
    case '/login':
    case '/language':
      next()
      return 1
  }
  if (loginState) {
    next()
  } else {
    next('/login')
  }
})

export default router
