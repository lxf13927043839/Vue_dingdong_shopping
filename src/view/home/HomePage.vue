<template>
    <div>
        <skeleton v-if="loading"></skeleton>
        <!-- 主页面 -->
        <!-- 页面的内容 -->
        <div v-else>
        <!-- 头部区域：轮播图区域，吸引提示区域 -->
        <header class="head">
            <!-- 搜索框 -->
            <!-- 头部搜索框区域 -->
            <div :class="{ search: true, 'bgc-fff': showSearchBgc }">
              <van-search :placeholder="$t('home.inputGoodsName')"
              shape="round" background="transparent" @focus="focusTip"/>
            </div>
            <!-- 轮播图区域 -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#73C14F">
                <van-swipe-item v-for="(item) in swipeImgList" :key="item.cid">
                    <img v-lazy="item.icon_url" alt="">
                </van-swipe-item>
            </van-swipe>
            <!-- 吸引用户信息 -->
            <ul class="attract-info">
              <li><img src="../../assets/images/icon/transport.png" alt=""><span>{{ $t('goodsDetail.quickTime') }}</span></li>
              <li><img src="../../assets/images/icon/money.png" alt=""><span>{{ $t('common.distributionTip') }}</span></li>
              <li><img src="../../assets/images/icon/seal.png" alt=""><span>{{ $t('common.easeBack') }}</span></li>
            </ul>
        </header>
        <!-- vip广告 -->
        <div class="vip-ad">
          <img :src="vipImg" alt="">
        </div>
        <!-- 分类图标 -->
        <van-grid square :border="false" :column-num="5">
          <van-grid-item v-for="(item, index) in categoriesIconSrc" :key="index"
          :icon="item.icon_url" :text="item.name" :to="'/home/category?name=' + item.name"/>
        </van-grid>
        <!-- 加入会员 -->
        <div class="join-vip" @click="onClickOpenVip">
          <span class="icon-center">
            <van-icon name="vip-card-o" size="0.5rem" color="yellow" />{{ $t('home.vipDesc') }}
          </span>
          <span>{{ $t('home.vipSubDesc') }}</span>
        </div>
        <!-- 限时购物模块 -->
        <div class="time-limited-purchase">
          <!-- 倒计时 -->
          <div class="top">
             <span class="title">{{ $t('home.limitBuy') }}</span>
             <div class="time">
               <span>{{ time.hour }}</span>
               <span>:</span>
               <span>{{ time.minute }}</span>
               <span>:</span>
               <span>{{ time.second }}</span>
             </div>
             <span class="more">{{ $t('home.more') }}</span>
          </div>
          <!-- 限时购物的滑动区域 -->
          <div class="bottom">
            <div class="wrapper">
              <ul class="foodContent" ref="foodContentRef">
                <li v-for="(item, index) in timeLimitedFood" :key="item.id" @click="clickToDetail(item)" ref="liRef">
                  <div class="img-container">
                    <div class="foodImg" ref="initialImg">
                      <img v-lazy="item.small_image" alt="">
                    </div>
                    <!-- 一开始图片放在这里边，但是受到overflow:fidden的影响，没办法显示到区域外
                    所以采用 fixe定位，图片放在这里的话，会有问题，滑动后有问题 -->
                    <!-- 把移动的图片放在这里 -->
                    <!-- <transition
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter">
                      <div class="moveFoodImg" v-show="show[index]" ref="imgRef">
                        <img :src="item.small_image" alt="">
                      </div>
                    </transition> -->
                  </div>
                  <div class="foodName">{{item.product_name}}</div>
                  <div class="price">
                    <div>
                      <!-- 搞两p标签更方便点 -->
                      <span class="sell">￥{{ item.origin_price }}</span>
                      <del class="origin">￥{{ item.price }}</del>
                    </div>
                    <!-- 要阻止冒泡= -->
                    <div class="shopCar" @click.stop="addToShopCar(item, index)">
                      <van-icon name="cart-circle" color="green" size="0.7rem"/>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
            </div>
            <!-- 动画图片 -->
            <div>
              <transition
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:after-enter="afterEnter"
              v-for="(item, index) in showAnimatePic" :key="index">
                <div class="moveFoodImg" v-if="item.show" ref="imgRef">
                  <img :src="item.src" alt="">
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- 特色专区模块 -->
        <div class="feature-area">
          <span class="title">{{ $t('home.specialZone') }}</span>
          <ul class="feature-show">
            <li v-for="(item) in featureShowList" :key="item.id">
              <p>{{ item.title }}</p>
              <p>{{ item.subtitle }}</p>
              <img v-lazy="item.imageOne" alt="">
              <img v-lazy="item.imageTwo" alt="">
            </li>
            <li class="feature-other">
              <div>
                <p>{{ featureOther.title }}</p>
                <p>{{ featureOther.subtitle }}</p>
                <img src="../../assets/images/special/peanut.jpeg" alt="">
              </div>
              <div>
                <p>{{ featureLow.title }}</p>
                <p>{{ featureLow.subtitle }}</p>
                <img v-lazy="featureLow.image" alt="">
              </div>
            </li>
          </ul>
        </div>

        <!-- tab标签页，带有粘性布局属性的 -->
        <van-tabs color="green" sticky :offset-top="50/37.5 + 'rem'">
          <van-tab :title="$t('eat.all')">
            <show-product-list :showProductList="showProductListData"></show-product-list>
          </van-tab>
          <van-tab :title="$t('home.dinner')">
            <show-product-list :showProductList="hotProductListData"></show-product-list>
          </van-tab>
          <van-tab :title="$t('home.popularity')">
            <show-product-list :showProductList="showProductListData"></show-product-list>
          </van-tab>
          <van-tab :title="$t('home.goodChoose')">
            <show-product-list :showProductList="hotProductListData"></show-product-list>
          </van-tab>
        </van-tabs>
        <!-- 返回顶部 -->
        <back-top></back-top>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

// 展示商品组件
import showProductList from './ShowProductList.vue'
// 小火箭，返回顶部
import backToTop from '../../components/backToTop/BackToTop.vue'
import { mapMutations, mapGetters, mapState} from 'vuex'
// 导入骨架屏
import skeleton from './skeleton/index.vue'

export default {
  data () {
    return {
      // 轮播图片地址
      swipeImgList: [],
      // vip广告图片
      vipImg: '',
      // 分类图标
      categoriesIconSrc: [],
      // 计时器
      time: {
        hour: '00',
        minute: '00',
        second: '00',
        // 定时器id
        timeId: 0
      },
      // 限时商品列表
      timeLimitedFood: [],

      // 特色专区数据列表,
      featureShowList: [],
      // 特色数据，这两个数据有些区别，结构不太一样，不能全for
      featureOther: {},
      featureLow: {},

      // 所有商品列表数据
      showProductListData: [],
      // 人气商品数据列表
      hotProductListData: [],
      // 动画效果触发,在created函数中，先预存20个动画
      showAnimatePic: [],
      clickIndex: 0,
      // 正在滑动的图片
      activeAnimatePic: [],

      // 显示 search 框背景
      showSearchBgc: false,
      // 暂时设置370
      targetDistance: 370,
      loading: true
    }
  },
  // 注册组件
  components: {
    'show-product-list': showProductList,
    'back-top': backToTop,
    skeleton
  },
  created () {
    this.getSwipeImgList()
    this.beginTimeDown(2 * 60 * 60)
    // 预存20个动画，
    for (var i = 0; i < 20; i++ ) {
      this.showAnimatePic[i] = {
        show: false
      }
    }
  },
  mounted () {
    // 计算ul的宽度
    // 它是在修改数据后，更新DOM后才执行。
    // this.$nextTick(() => {
    //   console.dir(this.$refs.foodContentRef)
    //   console.log(this.$refs.foodContentRef.offsetHeight, this.$refs.foodContentRef.children)
    // })
    /*
      在下拉一定距离后搜索框显示白色背景
    */
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    ...mapMutations([
      'addShopProduct'
    ]),
    /*
      根据滚动的距离决定显示搜索框的背景
    */
    onScroll () {
      const distance= document.documentElement.scrollTop || document.body.scrollTop
      if (distance >= this.targetDistance) {
        this.showSearchBgc = true
      } else {
        this.showSearchBgc = false
      }
    },
    /*
      商品加入购物车,动画完成后再添加进去
    */
    addToShopCar (item, index) {
      if (!this.loginState) {
        this.$router.push('/login')
        return
      }
      // 这里通过下标来获取是选择了哪个元素，图片，上边放了20，到时要设置初始化位置
      // 这里不需要了，this.clickindex就是你点击的图片的索引了，可以注释掉
      this.showAnimatePic.findIndex((pic, index) => {
        if (!pic.show) {
          pic.show = true
          pic.index = index
          pic.src = item.small_image
          // console.log(index)
          this.activeAnimatePic.push(pic)
          return true
        }
      })
      this.clickIndex = index
      // console.log(this.show)
      // 动画结束,添加商品
      var product = {}
      product.product_name = item.product_name
      product.id = item.id
      product.small_image = item.small_image
      product.price = item.price
      product.num = 1
      // 默认用户加入购物车上是被选上的
      product.checked = false

      // console.log(product)
      this.addShopProduct(product)
      // console.log(this.$store)
      // this.$toast('成功加入购物车')
      this.$toast(this.$t('common.addCarSuccess'))
    },
    // 获取轮播图图片资源
    async getSwipeImgList () {
      const { data } = await this.$http.get('homeApi')
      // console.log(data)
      if (!data.success) {
        return this.$toast.fail('获取轮播图数据失败')
      }
      // 看data的结构解析出来
      this.swipeImgList = data.data.list[0].icon_list
      this.vipImg = data.data.home_ad.image_url
      this.categoriesIconSrc = data.data.list[2].icon_list
      this.timeLimitedFood = data.data.list[3].product_list
      this.featureShowList.push(data.data.special_zone.hotItemList[0])
      this.featureShowList.push(data.data.special_zone.newItemList[0])
      this.featureShowList.push(data.data.special_zone.vipItemList[0])
      this.featureOther = (data.data.special_zone.otherItemList[0])
      this.featureLow = (data.data.special_zone.lowPriceItemList[0])
      this.showProductListData = data.data.list[12].product_list
      this.hotProductListData = data.data.list[3].product_list
      // 隐藏骨架屏
      this.loading = false
      // 计算ul的宽度
      this.$nextTick(() => {

        // console.dir(this.$refs.foodContentRef)
        var liCount = this.$refs.foodContentRef.children.length
        // 加上 1 是为了防止，实际宽度是小数，offsetWidth取的是整数，可能会导致偏小的情况
        var ulWidth = liCount * (this.$refs.foodContentRef.children[0].offsetWidth + 1)
        this.$refs.foodContentRef.style.width = ulWidth + 'px'
        // console.log(this.$refs.foodContentRef.children[0].offsetWidth)
        this.initBScroll()

        // 顺便初始化，动画移动的小图片
        // for (var i = 0; i < liCount; i++ ) {
        //   this.showAnimatePic[i] = false
        // }
      })
    },
    /*
      注意关闭左右滑动手势，会影响这个的使用
    */
    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.wrapper', {
          probeType: 2,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      } else {
        this.bs.refresh()
      }
    },
    /*
      功能：倒计时功能
      参数：数值型，单位：秒
    */
    getTimeDown (time) {
      this.time.hour = Math.floor(time / 60 / 60).toString().padStart(2, '0')
      this.time.minute = Math.floor(time / 60 % 60).toString().padStart(2, '0')
      this.time.second = Math.floor(time % 60).toString().padStart(2, '0')
    },
    beginTimeDown (time) {
      // 先要初始化一下，因为倒计时在1秒后才执行
      this.getTimeDown(time)
      // 这里形成了闭包,需要写成箭头函数
      this.timeId = setInterval(() => {
        time--
        if (time < 0) {
          clearInterval(this.timeId)
          this.timeId = null
          // console.log('time over')
          return
        }
        this.getTimeDown(time)
      }, 1000)
    },

    /* 点击跳转到详情 */
    clickToDetail (goodInfo) {
      this.$router.push(
        {
          path: '/productdetail',
          query: {
            id: goodInfo.id,
            name: goodInfo.name,
            small_image: goodInfo.small_image,
            price: goodInfo.price,
            spec: goodInfo.spec,
            total_sales: goodInfo.total_sales,
            origin_price: goodInfo.origin_price
          }
        })
    },

    // 添加购物车的动画类，500ms后移除，这里的话，没法使用ref获得dom元素，因为它是组件来着，通过原生方式
    _listenInCart () {
      // 给底部Tabbar购物车添加类
      document.getElementById("shopCarId").classList.add('moveToCart');
      setTimeout(() => {
        // 500毫秒后移除底部购物车的动画类
        document.getElementById("shopCarId").classList.remove('moveToCart');
      }, 500)
    },

    /*
      动画初始值处理
      获取点击的图片的距离屏幕左上角的位置，然后把该位置
      作为动画图片起使的位置

      加了transition的元素，由false变true的时候，就触发了这个钩子
    */
    beforeEnter (el) {
      // 图片尺寸调小点，避免挡住图片的按钮
      var imgSize = this.$refs.initialImg[this.clickIndex].getBoundingClientRect()
      el.style.height = `${imgSize.height - 20}px`
      el.style.width = `${imgSize.width - 20}px`

      var imgPosition = this.$refs.liRef[this.clickIndex].getBoundingClientRect()
      // 这样子写其实，多了一些多余的操作，比如第一次点击，初始化 1 次，就打印 1 次，但是第二次点击就打印了 3 次
      // var count = this.showAnimatePic.length
      // while(count--) {
      //   var pic = this.showAnimatePic[count]
      //   if (pic.show) {
      //     console.log(pic.index)
      //     // this.$refs.imgRef[pic.index].style.transform = `translate(${imgPosition.x}px, ${imgPosition.y}px)`
      //     el.style.transform = `translate(${imgPosition.x}px, ${imgPosition.y}px)`
      //   }
      // }
      el.style.transform = `translate(${imgPosition.x}px, ${imgPosition.y}px)`
      el.style.opacity = 1
    },
    // enter里边就不加done了
    enter (el) {
      var imgSize = this.$refs.initialImg[this.clickIndex].getBoundingClientRect()
      // console.log(imgSize) 这里除以 5 是在不同分辨率下,会有点变化,目前在js中找不到直接设置rem的方法
      el.offsetLeft
      el.style.transition = 'all 1.5s ease'
      el.style.opacity = 0
      el.style.height = `${imgSize.height/5}px`
      el.style.width = `${imgSize.width/5}px`
      // 结合类名是无效的，它马上就没了
      // el.style.className = 'animate-enter moveFoodImg'
      var target = {
        x: this.getShopCarPosition.x,
        y: this.getShopCarPosition.y
      }
      el.style.transform = `translate(${target.x}px, ${target.y}px)`
    },
    /*
      动画结束的时候，要恢复样式，不然等等看不到效果，因为enter的效果会一直存在的
      跟动画类不一样，它会自动去除
    */
    afterEnter (el) {
      el.style.transition = 'none'
      el.style.transform = 'translate(0px, 0px)'
      // el.style.className = 'moveFoodImg'
      var pic = this.activeAnimatePic.shift(); //结束后
      if (pic) {
        pic.show = false;
      }
      this._listenInCart()
    },
    /*
      计算出小图片移动的距离
      目前直接采用getBoundingClientRect()这个函数来处理
      要兼容的话，可能需要用offsetLeft,Top去进行加减处理
      // var liLeft = this.$refs.liRef[this.clickIndex].offsetLeft
      // var top = this.$refs.foodContentRef.offsetTop
      // var ulLeft = this.$refs.foodContentRef.offsetLeft
      // var screenX = liLeft - ulLeft
      下边moveXY的做法是对transfrom:tranlate的用法搞错了，做了多余的运算
    */
    // moveXY () {
    //   var imgPosition = this.$refs.liRef[this.clickIndex].getBoundingClientRect()
    //   console.log(imgPosition.left, imgPosition.top)
    //   console.log(this.getShopCarPosition.x, this.getShopCarPosition.y)
    //   var result = {
    //     x: this.getShopCarPosition.x - imgPosition.left,
    //     y: this.getShopCarPosition.y - imgPosition.top
    //   }
    //   console.log(result.x, result.y)
    //   return {
    //     x: result.x,
    //     y: result.y
    //   }
    // }
    focusTip () {
      this.$toast(this.$t('common.unrealized'))
    },
    onClickOpenVip () {
      if (!this.loginState) {
        this.$router.push('/login')
        return
      }
      this.$router.push('/mine/vip')
    }
  },
  computed: {
    ...mapGetters([
      'getShopCarPosition',
    ]),
    ...mapState([
      'loginState'
    ])
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .head {
        background-image: url("../../assets/images/home/backImage.png");
        /* 初步给头部,后续由内容进行撑开 */
        padding-left: 10/@rootRem;
        padding-right: 10/@rootRem;
        box-sizing: border-box;
        .search {
          position: fixed;
          z-index: 999;
          width: 100%;
          left: 50%;
          transform: translate(-50%);
        }

        /* 轮播图样式 */
        .my-swipe {
          padding-top: 55/@rootRem;
          img {
              display: block;
              width: 100%;
              // 这里的高度，如果不加控制，按比例，有点高了
              height: 175/@rootRem;
              border-bottom-right-radius: 20/@rootRem;
              border-bottom-left-radius: 20/@rootRem;
          }
        }
        .attract-info {
          // 使用margin会发生垂直外边距合并的问题
          padding: 10/@rootRem;
          display: flex;
          li {
            display: flex;
            width: 37.5%;
            align-items: center;
            img {
              height: 18/@rootRem;
              width: 18/@rootRem;
              margin-right: 5/@rootRem;
            }
            span {
              font-size: 12/@rootRem;
              color: #73C14F;
            }
            &:last-of-type {
              width: 25%;
            }
          }
        }
    }
    // vip广告
    .vip-ad {
      img {
        width: 100%;
        height: 105/@rootRem;
      }
    }
    .join-vip {
      margin: 10/@rootRem;
      padding:5/@rootRem;
      background-color: #73C14F;
      border-radius: 2/@rootRem;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12/@rootRem;
        color: #fff;
        display: inline-block;
        height: 35/@rootRem;
        line-height: 35/@rootRem;
      }
      .icon-center {
        display: flex;
        align-items: center;
        .van-icon {
          margin-right: 3/@rootRem;
        }
      }
    }
    /* 限时购物样式 */
    .time-limited-purchase {
      margin: 0 10/@rootRem;
      .top {
        display: flex;
        align-items: center;
        margin-bottom: 10/@rootRem;
        /* 初步解决它们对不齐，具体原因后续分析 */
        .title {
          font-size: 20/@rootRem;
          border-left: 4/@rootRem solid #73C14F;
          padding-left: 5/@rootRem;
        }
        .time {
          display: inline-block;
          margin-left: 10/@rootRem;
          span {
            background-color: #000;
            color: #fff;
            font-size: 12/@rootRem;
            display: inline-block;
            height: 22/@rootRem;
            width: 22/@rootRem;
            line-height: 22/@rootRem;
            text-align: center;
            /* 伪类选择器，优先级 1 */
            &:nth-of-type(even) {
              width: 10/@rootRem;
              font-weight: bold;
            }
            /* 相邻选择器 不会选择到一个,他的优先级为 0 */
            &+span {
              margin-left: 3/@rootRem;
            }
          }
        }
        .more {
          font-size: 14/@rootRem;
          color: #73C14F;
          position: absolute;
          right: 10/@rootRem;
          vertical-align: middle;
        }
      }
    }
    /* 限时购物样式 */

    /* 限时商品滑动 */
    .wrapper {
      white-space: nowrap;
      overflow: hidden;
      touch-action: none;
      .foodContent {
        display: inline-block;
        /* width: 2000/@rootRem; */
        li {
          float: left;
          padding-right: 15/@rootRem;
        }
        /* 商品图片 */
        .foodImg {
          width: 100/@rootRem;
          height: 100/@rootRem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .img-container {
          position: relative;
        }
        /* 商品名称 */
        .foodName {
          font-size: 12/@rootRem;
          // 名字可能占两行
          height: 35/@rootRem;
          width: 100/@rootRem;
          white-space:normal;
        }
        /* 价格 */
        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          >div {
            display: flex;
            flex-direction: column;
            .sell {
              color: red;
              font-size: 16/@rootRem;
            }
            .origin {
              color: #bbb;
              font-size: 13/@rootRem;
            }
          }
        }
      }
    }
    /* 限时商品滑动 */

    /* 特色专区样式 */
    .feature-area {
      margin: 0 10/@rootRem;
      margin-top: 25/@rootRem;
      .title {
        font-size: 20/@rootRem;
        border-left: 4/@rootRem solid #73C14F;
        padding-left: 5/@rootRem;
      }
      .feature-show {
        margin-top: 15/@rootRem;
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        li {
          width: 50%;
          box-sizing: border-box;
          padding-left: 8/@rootRem;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
          p {
            font-size: 12/@rootRem;
            margin: 0;
            padding-bottom: 5/@rootRem;
            color: #73C14F;
            &:last-of-type {
              color: #aaa
            }
          }
          img {
            width: 53/@rootRem;
            height: 43/@rootRem;
            &:first-of-type {
              margin-right: 25/@rootRem;
            }
          }
        }
        .feature-other {
          display: flex;
          div {
            width: 50%;
            &:last-of-type {
              border-left: 1px solid #ddd;
              padding-left: 8/@rootRem;
            }
          }
        }
      }
    }
    /* 特色专区样式 */
    .van-tabs {
      margin-top: 10/@rootRem;
    }
    /*
      动画类,发现在钩子函数里不能够
    */
    .animate-enter {
      transition: all 2s ease;
      opacity: 0;
      height: 20/@rootRem;
      width: 20/@rootRem;
    }
    /* 动画图片的样式 */
    .moveFoodImg {
      width: 100/@rootRem;
      height: 100/@rootRem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .moveFoodImg {
      z-index: 99;
      position: fixed;
      top: 0;
      left: 0;
    }
    /* 动画图片的样式 */

    /* 搜索框移动后的样式 */
    .bgc-fff {
      background-color: #fff!important;
    }

    /* 图片懒加载时候的样式 */
    img[lazy="loading"] {
      width: 100%;
      height: 100%;
    }
    .feature-area {
      img[lazy="loading"] {
        width: 53/@rootRem;
        height: 43/@rootRem;
        &:first-of-type {
          margin-right: 25/@rootRem;
        }
      }
    }
    .my-swipe {
      img[lazy="loading"] {
        display: block;
        width: 100%;
        // 这里的高度，如果不加控制，按比例，有点高了
        height: 175/@rootRem;
        border-bottom-right-radius: 20/@rootRem;
        border-bottom-left-radius: 20/@rootRem;
      }
    }
</style>
