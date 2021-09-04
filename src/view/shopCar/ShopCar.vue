<template>
    <div :class="{ 'car-container': true, 'bgc-f5': !loading }">
        <div class="title">{{ $t('car.title') }}
            <van-icon name="delete"
            v-if="!showBlankCar"
            color="red" size="0.7rem"
            @click="deleteSelectProduct"/>
        </div>
        <!-- 骨架屏 -->
        <skeleton v-if="loading"></skeleton>
        <div v-else>
        <!-- 购物商品部分 -->
        <div class="showShopCar" v-if="showBlankCar">
            <div class="pic">
                <img src="../../assets/images/cart/empty.png" alt="">
            </div>
            <p>{{ $t('car.tip') }}</p>
            <!-- 本来用router-link但是没法改图标下标,现在改成按钮处理 -->
            <!-- <router-link to="/home/homepage" class="go-home" @click="changeTabbar">去逛逛</router-link> -->
            <div class="go-home" @click="changeTabbar">{{ $t('car.walk') }}</div>
        </div>
        <!-- 购物车中的商品 -->
        <select-product v-else></select-product>
        <!-- 猜你喜欢部分 -->
        <div class="you-like">
            <van-divider
            :style="{ borderColor: 'gray', padding: '0 16px'}" class="line">
            {{ $t('car.guess') }}
            </van-divider>
            <ul class="product-list">
                <li v-for="item in youLikeDataList" :key="item.id" @click="ClickEnterDetail(item)">
                    <img v-lazy="item.small_image" alt="">
                    <p>{{ item.product_name }}</p>
                    <p>{{ item.spec }}</p>
                    <div class="price">
                        <span>￥{{ item.price }}</span>
                        <span>￥{{ item.origin_price }}</span>
                    </div>
                    <!-- 需阻止冒泡行为，不然点击后，会跳到详情页面 -->
                    <van-icon name="cart-circle" size="0.8rem" color="green" @click.stop="addToShopCar(item)"/>
                </li>
            </ul>
        </div>
        </div>
        <back-top></back-top>
    </div>
</template>

<script>
import Rocket from '../../components/backToTop/BackToTop.vue'
import SelectGoods from './SelectProduct.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
// 导入骨架屏
import skeleton from './skeleton'

export default {
  data () {
    return {
      youLikeDataList: [],
      loading: true
    }
  },
  components: {
    'back-top': Rocket,
    // 最好重命名一下，跟下边的state名字比较类似
    // 'select-product': SelectProduct
    'select-product': SelectGoods,
    skeleton
  },
  created () {
    this.getYouLikeDataList()
  },
  computed: {
    ...mapState([
      'loginState'
    ]),
    ...mapGetters([
      'totalProductNum'
    ]),
    // 是否需要显示空空的购物车
    showBlankCar: function () {
      // 没有数量情况下，直接显示
      if (this.totalProductNum <= 0) {
        return true
      } else {
        // 有数量的情况还需要，判断用户是否登录了
        if (this.loginState) {
          // 用户登录的话，不显示了
          return false
        } else {
          return true
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'addShopProduct',
      'deleteCheckProduct',
      'changeTabbarIndex'
    ]),
    async getYouLikeDataList () {
      const { data } = await this.$http.get('cart/youlike')
      // console.log(data)
      if (data.success) {
        this.youLikeDataList = data.data.product_list
        this.loading = false
      }
    },
    /*
        进入商品的详情页面，具体信息
        通过编程式导航跳转
    */
    ClickEnterDetail (goodInfo) {
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
      this.$toast(this.$t('common.addCarSuccess'))
    },

    /*
      删除选中的商品
    */
    deleteSelectProduct () {
      this.$dialog.confirm({
        title: this.$t('common.tipTile'),
        message: this.$t('common.deleteConfirm')
      })
        .then(() => {
          // on confirm
          this.deleteCheckProduct()
        })
        .catch(() => {
          // on cancel
        })
    },
    changeTabbar () {
      // 需要设置底下的tabbar
      this.changeTabbarIndex(0)
      this.$router.push('/home/homepage')
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .bgc-f5 {
      background-color: #f5f5f5;
    }
    .car-container {
        padding-top: 45/@rootRem;
        .title {
            width: 100%;
            height: 45/@rootRem;
            line-height: 45/@rootRem;
            text-align: center;
            font-size: 17/@rootRem;
            background-color: #fff;
            position: fixed;
            top: 0;
            z-index: 1;
            border-bottom: 1/@rootRem solid #eee;
            .van-icon {
              position: absolute;
              right: 10/@rootRem;
              top: 50%;
              transform: translateY(-50%);
            }
        }
        .showShopCar {
            .pic {
                width: 50%;
                margin: 0 auto;
                img {
                    width: 100%;
                }
            }
            p {
                font-size: 16/@rootRem;
                text-align: center;
                margin: 10/@rootRem 0;
            }
            .go-home {
                color: white;
                width: 105/@rootRem;
                height: 35/@rootRem;
                line-height: 35/@rootRem;
                display: block;
                text-align: center;
                background-color: #45c763;
                font-size: 18/@rootRem;
                border-radius: 20/@rootRem;
                margin: 0 auto;
            }
        }
        /* 猜你喜欢样样式*/
        .you-like {
            background-color: #f5f5f5;
            /* 处理垂直外边距合并问题 */
            overflow: hidden;
            .line {
                color: black;
                font-size: 16/@rootRem;
            }
            .product-list {
                display: flex;
                padding: 0 8/@rootRem;
                flex-wrap: wrap;
                justify-content: space-between;
                li {
                    width: 49%;
                    box-sizing: border-box;
                    background-color: #fff;
                    margin-top: 10/@rootRem;
                    position: relative;
                    padding-bottom: 10/@rootRem;
                    /* 懒加载图片样式 */
                    img[lazy="loading"],
                    img {
                        width: 100%;
                    }
                    p {
                        font-size: 12/@rootRem;
                        &:last-of-type {
                            color: #808080;
                            padding-bottom: 20/@rootRem;
                        }
                    }
                    .price {
                        span {
                            font-size: 16/@rootRem;
                            color: #f37078;
                            padding-right: 10/@rootRem;
                            &:last-of-type {
                                font-size: 12/@rootRem;
                                color: #999;
                                text-decoration: line-through;
                            }
                        }
                    }
                    .van-icon {
                        position: absolute;
                        right: 10/@rootRem;
                        bottom: 10/@rootRem;
                    }
                }
            }
        }
    }
</style>
