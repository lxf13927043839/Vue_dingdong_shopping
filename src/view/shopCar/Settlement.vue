<template>
    <div class="settlment-wrapper">
        <!-- 这里不能用back,它有可能会跟地址路由，陷入循环 -->
        <van-nav-bar :title="$t('order.inputForm')" left-arrow
        @click-left="$router.push('/home/shopcar')"/>
        <!-- 收货地址 -->
        <div class="address">
            <van-contact-card v-if="!showAddress" type="add" @click="onAddAddress" :add-text="$t('order.location')"/>
            <van-contact-card v-else type="edit" :name="$route.query.name" :tel="$route.query.tel"
            @click="onAddAddress"/>

        </div>
        <!-- 订单列表 -->
        <div class="order-product-list" @click="onClickShowProduct">
            <van-cell :value="orderProduct.length" is-link center value-class="font18">
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div class="left-img">
                  <img v-lazy="item.small_image" alt=""
                  v-for="(item) in orderProduct" :key="item.id">
                </div>
              </template>
            </van-cell>
        </div>
        <!-- 支付方式 -->
        <div class="pay">
          <pay-method></pay-method>
        </div>
        <!-- 优惠券 -->
        <div class="coupon">
          <!-- 优惠券单元格 -->
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"/>
          <!-- 优惠券列表 -->
          <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px;">
              <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :enabled-title="$t('coupon.useCoupon')"
              :input-placeholder="$t('mine.persent')"
              :disabled-title="$t('coupon.noUserCoupon')"
              @change="onChange"
              @exchange="onExchange"/>
          </van-popup>
        </div>

        <!-- 支付宝积分兑换 -->
        <div class="zfb-jifen">
          <van-cell center>
            <template #right-icon>
              <van-switch v-model="switchChecked" size="24" @click="onClickSwitch"/>
            </template>
            <template #title>
              <!-- <p>800支付宝积分支付</p> -->
              <p>{{ $t('order.use') }} 800{{ $t('order.aliPay') }}{{ $t('order.point') }}</p>
              <p>￥8.00</p>
            </template>
          </van-cell>
        </div>
        <!-- 备注 -->
        <van-field
        v-model="note"
        :label="$t('order.mark')"
        right-icon="arrow"
        :placeholder="$t('order.tip')"/>

        <!-- 商品金额,配送费 -->
        <van-cell :title="$t('order.totalMoney')" :value="'￥' + totalPay/100" />
        <van-cell :title="$t('order.sendMoney')" value="￥0.00" />

        <!-- 提交订单 -->
        <div class="submitOrder">
          <van-button type="danger" @click="onSubmitOrder">{{$t('order.sendForm') }}</van-button>
          <div class="price">
            <span>{{ $t('order.pay') }}：</span>
            <span>￥{{ totalPay/100 - zfbPay - couponPay }}</span>
          </div>
        </div>
    </div>
</template>

<script>
import PayMethod from '../../components/payMethod/PayMethod.vue'
import { mapState, mapGetters } from 'vuex'
var coupon = {
  available: 1,
  // condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  //name: '优惠券',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  //unitDesc: '元'
}
var coupon1 = {
  available: 2,
  //condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 400,
  //name: '优惠券',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '4',
  //unitDesc: '元'
}

export default {
  data () {
    return {
      // 订单中的商品
      orderProduct: [],
      // 优惠券
      chosenCoupon: -1,
      coupons: [coupon, coupon1],
      showList: false,
      // 支付宝积分
      switchChecked: false,
      // 备注
      note: '',
      // 优惠数目
      couponPay: 0,
      // 支付宝积分
      zfbPay: 0,
      // 显示地址
      showAddress: false
    }
  },
  created () {
    this._initOrderProduct()
    if (this.$route.query.name) {
      this.showAddress = true
    }
    this._initCouponArray()
  },
  methods: {
    // 添加地址
    onAddAddress () {
      this.$router.push({
        path: '/mine/myaddress',
        query: {
          receive: true
        }
      })
    },
    // 获取用户选中的商品
    _initOrderProduct () {
      this.selectProduct.forEach((item) => {
        if (item.checked) {
          this.orderProduct.push(item)
        }
      })
    },
    onClickShowProduct () {
      this.$router.push('/settlement/showproduct')
    },
    // 优惠券
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
      if (index !== -1) {
        this.couponPay = this.coupons[this.chosenCoupon].valueDesc
      } else {
        this.couponPay = 0
      }
      // console.log(this.couponPay)
    },
    onExchange(code) {
      if (code === '520web')
      this.coupons.push(coupon)
    },
    // 触发点击完成后，switchChecked变化的，这一点稍微有点不同
    onClickSwitch () {
      // console.log(this.switchChecked)
      if (this.switchChecked) {
        this.zfbPay = 0
      } else {
        this.zfbPay = 8
      }
      // console.log(this.zfbPay)
    },
    // 初始化优惠券内容中英文
    _initCouponArray () {
      coupon.condition = this.$t('coupon.threshold')+'\n'+this.$t('coupon.discount')
      coupon.name = this.$t('coupon.coupon')
      coupon.unitDesc = this.$t('coupon.yuan')
      coupon1.condition = this.$t('coupon.threshold')+'\n'+this.$t('coupon.discount')
      coupon1.name = this.$t('coupon.coupon')
      coupon1.unitDesc = this.$t('coupon.yuan')
    },
    onSubmitOrder () {
      this.$toast('暂未实现，敬请期待~~~')
    }
  },
  computed: {
    ...mapState([
      'selectProduct'
    ]),
    ...mapGetters([
      'totalPay'
    ])
  },
  watch: {
    selectProduct: function () {
      this._initOrderProduct()
    }
  },
  components: {
    'pay-method': PayMethod
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    /* 订单中的商品数据 */
    .settlment-wrapper {
      background-color: #f5f5f5;
      padding-top: 50/@rootRem;
    }
    .van-nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
    .pay {
      margin-top: 20/@rootRem;
    }
    .coupon {
      margin-top: 15/@rootRem;
    }
    .zfb-jifen {
      border-top: 1/@rootRem solid #f5f5f5;
    }
    .van-field {
      margin: 15/@rootRem 0;
    }
    .order-product-list {
      img {
        width: 60/@rootRem;
        height: 60/@rootRem;
        float: left;
      }
    }
    .font18 {
      font-size: 18/@rootRem;
    }
    .left-img {
      width: 280/@rootRem;
      overflow: hidden;
      display: flex;
      flex-wrap: nowrap;  
    }
    .submitOrder {
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      .van-button {
        float: right;
        margin-left: 20/@rootRem;
      }
      .price {
        float: right;
        height: 42/@rootRem;
        line-height: 42/@rootRem;
        span {
          font-size: 14/@rootRem;
          &:last-of-type {
            color: red;
            font-size: 18/@rootRem;
          }
        }
      }
    }
</style>
