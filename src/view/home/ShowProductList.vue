<template>
    <div class="product-wrapper">
        <div class="product" v-for="(item) in showProductList" :key="item.id" @click="ClickEnterDetail(item)">
            <!-- <img :src="item.small_image" alt=""> -->
            <img v-lazy="item.small_image" alt="">

            <p>{{ item.product_name }}</p>
            <p>{{ item.spec }}</p>
            <div class="price">
                <span>￥{{ item.price }}</span>
                <del>￥{{ item.origin_price }}</del>
            </div>
            <van-icon name="cart-circle" color="green" @click.stop="addToShopCar(item)"/>
        </div>
        <div class="over">{{ $t('home.bottomTip') }}</div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: {
    showProductList: Array
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
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .product-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        background-color: #f5f5f5;
        padding: 10/@rootRem;
        justify-content: space-between;
        box-sizing: border-box;
        .product {
            background-color: #fff;
            width: 49%;
            margin-top: 10/@rootRem;
            position: relative;
            img {
                width: 100%;
            }
            p {
                font-size: 12/@rootRem;
                margin-top: 0;
                margin-bottom: 5/@rootRem;
                padding: 0 5/@rootRem;
                &:last-of-type {
                    color: #808080;
                }
            }
            .price {
                font-size: 12/@rootRem;
                margin-top: 20/@rootRem;
                span {
                    font-size: 16/@rootRem;
                    color: #F87073;
                    font-weight: bold;
                    margin-right: 5/@rootRem;
                }
                del {
                    color: #808080;
                }
            }
            .van-icon {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
        .over {
            padding-top: 20/@rootRem;
            margin: 0 auto;
            color: #5c729c;
            text-align: center;
            font-size: 16/@rootRem;
        }
    }
    //设置加载图片时候loading的图片大小
    img[lazy="loading"] {
      width: 100%;
    }

</style>
