<template>
    <div>
        <div class="cate-name">{{ productsListData.name }}</div>
        <div class="wrapper">
            <ul ref="ulRef">
                <li v-for="item in productsListData.products" :key="item.id" @click="clickToDetail(item)">
                    <div class="pic">
                        <img v-lazy="item.small_image" alt="">
                    </div>
                    <div class="goodInfo">
                        <p>{{ item.name }}</p>
                        <p>{{ item.spec }}</p>
                        <div>
                            <span>￥{{ item.price }}</span>
                            <span>￥{{ item.origin_price }}</span>
                        </div>
                        <van-icon name="cart-circle" size="0.7rem" color="green" @click.stop="addToShopCar(item)"/>
                    </div>
                </li>
                <div class="over">-。-...没有了咯</div>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      bs: null
    }
  },
  mounted () {
    this.initBScroll()
  },
  watch: {
    // 检测数据的到来
    productsListData: function () {
      this.$nextTick(() => {
        this.initBScroll()
      })
    }
  },
  computed: {
    ...mapState([
      'loginState'
    ])
  },
  methods: {
    ...mapMutations([
      'addShopProduct'
    ]),
    /*
      商品加入购物车
    */
    addToShopCar (item) {
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

    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.wrapper', {
          probeType: 2,
          click: true,
          scrollX: false,
          scrollY: true
          // eventPassthrough: 'vertical'
        })
      } else {
        this.bs.refresh()
      }
    },

    /*
      点击跳转商品详情
    */
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
    }
  },
  props: {
    productsListData: Object
  }
}
</script>

<style lang="less" scoped>
  @rootRem: 37.5rem;
  .cate-name {
    font-size: 13/@rootRem;
    color: #93999f;
    height: 40/@rootRem;
    line-height: 40/@rootRem;
    background-color: #f3f5f7;
    border-left: 3/@rootRem solid #d9dde1;
    border-bottom: 1/@rootRem solid #d9dde1;
    padding-left: 10/@rootRem;
  }
  .wrapper {
    height: 474/@rootRem;
    overflow: hidden;
    ul {
      li {
        position: relative;
        display: flex;
        padding: 0 5/@rootRem;
        padding-top: 10/@rootRem;
        padding-bottom: 15/@rootRem;
        border-bottom: 1/@rootRem solid rgba(7,17,27,.1);
        .pic {
          width: 70/@rootRem;
          height: 70/@rootRem;
          padding-right: 5/@rootRem;
          /*
            当位置不够的时候，不要去积压图片
          */
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goodInfo {
          p {
            &:first-of-type {
              font-size: 14/@rootRem;
              padding-bottom: 5/@rootRem;
            }
            &:last-of-type {
              font-size: 12/@rootRem;
              color: #93999f;
              text-indent: 1em;
            }
          }
          div {
            span {
              &:first-of-type {
                color: red;
                font-size: 14/@rootRem;
                padding-right: 10/@rootRem;
              }
              &:last-of-type {
                font-size: 12/@rootRem;
                color: #93999f;
                text-decoration: line-through;
              }
            }
          }
          .van-icon {
            position: absolute;
            right: 10/@rootRem;
            bottom: 5/@rootRem;
          }
        }
      }
      /*
        结束了
      */
      .over {
        display: block;
        font-size: 16/@rootRem;
        text-align: center;
        background-color: #eee;
        height: 100/@rootRem;
        line-height: 100/@rootRem;
      }
    }
  }
  /* 懒加载图片样式 */
  img[lazy="loading"] {
    width: 100%;
    height: 100%;
  }
</style>
