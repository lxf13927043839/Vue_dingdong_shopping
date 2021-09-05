<template>
    <div class="show-product">
        <van-nav-bar :title="$t('order.goodsList')" left-arrow
        @click-left="$router.back()"/>
        <div class="title">
            <!-- <span>商品</span> -->
            <span>{{ $t('order.goods') }}</span>
            <span>{{ orderProduct.length }}</span>
        </div>
        <ul class="product-list">
            <li v-for="item in orderProduct" :key="item.id">
                <div class="left">
                    <img v-lazy="item.small_image" alt="">
                    <div class="info">
                        <p>{{ item.product_name }}</p>
                        <!-- <p>单价：￥{{ item.price }} 数量：{{ item.num }}</p> -->
                        <p>{{ $t('order.sigalPrice') }}￥{{ item.price }} {{ $t('order.numbers') }}{{ item.num }}</p>
                    </div>
                </div>
                <div class="right">
                    <span>￥{{ (item.price * item.num).toFixed(2) }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
    return {
      // 订单中的商品
      orderProduct: [],
    }
  },
  created () {
    this._initOrderProduct()
  },
  methods: {
    // 获取用户选中的商品
    _initOrderProduct () {
      this.selectProduct.forEach((item) => {
        if (item.checked) {
          this.orderProduct.push(item)
        }
      })
    }
  },
  computed: {
    ...mapState([
      'selectProduct'
    ])
  },
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .show-product {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
    }
    .title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1/@rootRem solid #e8e9e8;
        margin-top: 15/@rootRem;
        background-color: #fff;
        font-size: 16/@rootRem;
        padding: 10/@rootRem;
    }
    .product-list {
        background-color: #fff;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5/@rootRem 10/@rootRem;
            border-bottom: 1/@rootRem solid #e8e9e8;

            .left {
                display: flex;
                align-items: center;
                img[lazy="loading"],
                img {
                    width: 60/@rootRem;
                    height: 60/@rootRem;
                }
                .info {
                    margin-left: 5/@rootRem;
                    p {
                        &:first-of-type {
                            font-size: 14/@rootRem;
                            padding-bottom: 10/@rootRem;
                        }
                        &:last-of-type {
                            font-size: 12/@rootRem;
                            color: #808080;
                        }
                    }
                }
            }
            .right {
                span {
                    display: block;
                    font-size: 14/@rootRem;
                    width: 50/@rootRem;
                }
            }
        }
    }
</style>
