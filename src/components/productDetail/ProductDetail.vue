<template>
    <div class="goodDetail-wrapper">
        <van-nav-bar :title="$t('goodsDetail.goodsDetail')" left-arrow
        @click-left="onClickLeft"/>
        <!-- 商品信息 -->
        <div class="main-content">
            <img v-lazy="goodsInfo.small_image" alt="">
            <div class="good-info">
                <p>{{ goodsInfo.name}}</p>
                <p>{{ goodsInfo.spec }}</p>
                <div class="price">
                    <span>￥{{ goodsInfo.origin_price }}</span>
                    <del>￥{{ goodsInfo.price }}</del>
                    <span>{{ $t('goodsDetail.sold') }}: {{ goodsInfo.total_sales }}</span>
                </div>
                <div class="line"></div>
                <div class="calcuate-weight">
                  <van-icon name="cluster-o" />
                  <span>{{ $t('goodsDetail.goodsTips') }}</span>
                </div>
                <div class="line"></div>
                <div class="arrive-time">
                  <van-icon name="clock-o" />
                  <span>{{ $t('goodsDetail.quickTime') }}</span>
                </div>
            </div>
        </div>
        <!-- 规格 -->
        <div class="standard">
            <p>{{ $t('goodsDetail.specifications') }}</p>
            <div class="line"></div>
            <p>
              <span>{{ $t('goodsDetail.preservationConditions') }}</span>
              <span>{{ $t('goodsDetail.coldStorage') }}</span>
            </p>
            <div class="line"></div>
            <p>
              <span>{{ $t('goodsDetail.shelfLife') }}</span>
              <span>{{ $t('goodsDetail.day') }}</span>
            </p>
        </div>
        <div class="show-good">
          <img v-lazy="goodsInfo.small_image" alt="">
          <img src="https://img.ddimg.mobi/3f280ff77ab3d1571213379189.jpg?width=750&height=1869" alt="">
        </div>
        <!-- 底部购物车模块 -->
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" :text="$t('car.title')" :badge="totalProductNum"
            :class="{ 'hide-badge': hideBadge}"/>
            <van-goods-action-button
            type="warning"
            :text="$t('goodsDetail.addToCar')"
            @click="onClickJoinCar"/>
        </van-goods-action>
        <back-to-top></back-to-top>
    </div>
</template>

<script>
// 导入小火箭
import backToTop from '../backToTop/BackToTop.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      // 商品详情
      goodsInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'totalProductNum'
    ]),
    ...mapState([
      'loginState'
    ]),
    // 是否需要显示徽标
    hideBadge: function () {
      // 没有数量情况下，直接隐藏
      if (this.totalProductNum <= 0) {
        return true
      } else {
        // 有数量的情况还需要，判断用户是否登录了
        if (this.loginState) {
          return false
        } else {
          return true
        }
      }
    }
  },
  components: {
    'back-to-top': backToTop
  },
  created () {
    this.deepClone(this.goodsInfo, this.$route.query)
    // console.log(this.$route)
    // console.log(this.goodsInfo)
  },
  methods: {
    ...mapMutations([
      'addShopProduct'
    ]),
    onClickLeft () {
      this.$router.go(-1)
    },
    /*
      手动写深拷贝，有现成的库可以使用
      key是属性
    */
    deepClone (valueTo, valuefrom) {
      for (var key in valuefrom) {
        // eslink为了安全，不能直接这样操作，要换成别的写法
        // if (valuefrom.hasOwnProperty(key)) {
        if (Object.prototype.hasOwnProperty.call(valuefrom, key)) {
          // 是否是对象
          if (valuefrom[key] instanceof Object) {
            // 新的对象属性，再去拷贝
            valueTo[key] = {}
            this.deepClone(valueTo[key], valuefrom[key])
          } else if (valuefrom[key] instanceof Array) {
            // 新数组
            valueTo[key] = []
            this.deepClone(valueTo[key], valuefrom[key])
          } else {
            valueTo[key] = valuefrom[key]
          }
        }
      }
    },
    _addToShopCar (item) {
      if (!this.loginState) {
        this.$router.push('/login')
        return
      }
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
    onClickJoinCar () {
      this._addToShopCar(this.goodsInfo)
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .bottom-shop-car {
        padding: 0 20/@rootRem
    }
    .van-goods-action {
        padding: 0 20/@rootRem;
    }
    /* 商品信息模块 */
    .goodDetail-wrapper {
      background-color: #f5f5f5;
      .main-content {
        img[lazy="loading"],
        img {
          width: 100%;
        }
        .good-info {
          margin-top: 3/@rootRem;
          padding-right: 10/@rootRem;
          padding-left: 10/@rootRem;
          padding-top: 5/@rootRem;

          background-color: #fff;
          font-size: 14/@rootRem;
          p:last-of-type {
            font-size: 12/@rootRem;
            color: #808080;
            padding: 8/@rootRem 0;
          }
          .price {
            padding-bottom: 20/@rootRem;
            del {
              font-size: 12/@rootRem;
              color: #808080;
              padding-left: 10/@rootRem;
            }
            span {
              color: #e25450;
              font-weight: bold;
              &:last-of-type {
                float: right;
              }
            }
          }
          .line {
            background-color: #f5f5f5;
            height: 1/@rootRem;
          }
          .calcuate-weight,
          .arrive-time {
            span {
              height: 30/@rootRem;
              line-height: 30/@rootRem;
              font-size: 12/@rootRem;
              color: #808080;
              padding-left: 5/@rootRem;
            }
          }
        }
      }
      .standard {
        background-color: #fff;
        margin: 20/@rootRem 0;
        padding: 0 10/@rootRem;
        .line {
          background-color: #f5f5f5;
          height: 1/@rootRem;
        }
        p {
          font-size: 18/@rootRem;
          height: 40/@rootRem;
          line-height: 40/@rootRem;
          span {
            color: #808080;
            font-size: 12/@rootRem;
            &:first-of-type {
              // 在英文位置不够，布局错乱了
              // width: 100/@rootRem;
              // display: inline-block;
              padding-right: 15/@rootRem;
            }
          }
        }
      }
      .show-good {
        img[load="loading"],
        img {
          width: 100%;
          &:first-of-type {
            margin-bottom: 2/@rootRem;
          }
        }
      }
    }
    /* 当0的时候隐藏，小徽标 */
    .hide-badge {
      /deep/.van-info {
        display: none;
      }
    }
</style>
