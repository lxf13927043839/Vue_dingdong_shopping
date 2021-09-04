<template>
    <div class="my-coupon">
        <van-nav-bar :title="$t('mine.myBills')" left-arrow @click-left="$router.back()"/>
        <div class="coupon">
            <!-- 优惠券列表 -->
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :show-close-button="false"
                :enabled-title="$t('coupon.useCoupon')"
                :disabled-title="$t('coupon.noUserCoupon')"
                :input-placeholder="$t('mine.persent')"
                @change="onChange"
                @exchange="onExchange"
                :empty-image="'https://img.yzcdn.cn/vant/coupon-empty.png'"
            />
        </div>
    </div>
</template>

<script>
const coupon = {
  available: 1,
  // condition: '无使用门槛\n最多优惠1.5元',
  reason: '',
  value: 150,
  // name: '优惠券',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  // unitDesc: '元'
}
export default {
  data () {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    }
  },
  created () {
    this._initCouponArray()
  },
  methods: {
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    // 兑换优惠券
    onExchange (code) {
      if (code === '520web') {
        this.coupons.push(coupon)
      }
    },
    // 初始化优惠券内容中英文
    _initCouponArray () {
      coupon.condition = this.$t('coupon.threshold')+'\n'+this.$t('coupon.discount')
      coupon.name = this.$t('coupon.coupon')
      coupon.unitDesc = this.$t('coupon.yuan')
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .my-coupon {
        .van-nav-bar {
            /* 小箭头颜色 */
            /deep/.van-icon {
                color:rgb(40, 190, 87);
            }
        }
    }
</style>
