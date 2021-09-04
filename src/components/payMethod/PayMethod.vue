<template>
    <div class="pay-methods">
        <!-- <p>支付方式</p> -->
        <p>{{ $t('order.payMethod') }}</p>
        <van-radio-group v-model="radio">
        <van-cell-group>
            <van-cell title="微信支付" clickable @click="radio = '1'">
                <template #title>
                    <img src="../../assets/images/order/wx.png" alt="">
                    <!-- <span>微信支付</span> -->
                    <span>{{ $t('order.wechatPay') }}</span>
                </template>
                <template #right-icon>
                    <van-radio name="1" />
                </template>
            </van-cell>
            <van-cell title="支付宝支付" clickable @click="radio = '2'">
                <template #title>
                    <img src="../../assets/images/order/zfb.png" alt="">
                    <!-- <span>支付宝支付</span> -->
                    <span>{{ $t('order.aliPay') }}</span>
                </template>
                <template #right-icon>
                    <van-radio name="2" />
                </template>
            </van-cell>
            <van-cell title="花呗支付" clickable @click="radio = '3'">
                <template #title>
                    <img src="../../assets/images/order/hb.png" alt="">
                    <!-- <span>花呗支付</span> -->
                    <span>{{ $t('order.huabeiPay') }}</span>
                </template>
                <template #right-icon>
                    <van-radio name="3" />
                </template>
            </van-cell>
        </van-cell-group>
        </van-radio-group>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // num类型的数值
      radio: 0
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    /* 支付方式 */
    .pay-methods {
        p {
            font-size: 14/@rootRem;
            color: #969799;
            padding-bottom: 10/@rootRem;
            padding-left: 15/@rootRem;
        }
        span {
            padding-left: 10/@rootRem;
        }
    }
    /* 支付方式 */
</style>
