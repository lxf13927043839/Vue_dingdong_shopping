<template>
    <div class="open-vip">
        <van-nav-bar :title="$t('mine.openCard')" left-arrow @click-left="$router.back()"/>
        <!-- 用户信息区域 -->
        <div class="user">
            <img src="../../../assets/images/login/kmr.jpeg" alt="">
            <div class="info">
                <p>{{ userInfo.user_name }}</p>
                <!-- <p>绿卡未开通</p> -->
                <p>{{ $t('mine.cardUeless') }}</p>
            </div>
        </div>
        <!-- 三大特权区域 -->
        <div class="priviage-3">
            <!-- <h3>开通绿卡享三大权益,预计每单省6.66元</h3> -->
            <h3>{{ $t('mine.recomend') }}</h3>
            <ul>
                <li>
                    <van-icon name="vip-card-o" size="0.8rem" color="rgb(96, 184, 106)"/>
                    <!-- <span>专享券</span> -->
                    <span>{{ $t('mine.cardTip1') }}</span>
                </li>
                <li>
                    <van-icon name="discount" size="0.8rem" color="rgb(96, 184, 106)"/>
                    <!-- <span>专享特价</span> -->
                    <span>{{ $t('mine.cardTip2') }}</span>
                </li>
                <li>
                    <van-icon name="gem-o" size="0.8rem" color="rgb(96, 184, 106)"/>
                    <!-- <span>2倍积分</span> -->
                    <span>{{ $t('mine.cardTip3') }}</span>
                </li>
            </ul>
        </div>
        <!-- 季卡，年卡区域 -->
        <div class="card">
            <van-radio-group v-model="radioCard">
            <ul>
                <li v-for="(item, index) in vip_cards" :key="item.id"
                :class="{ activeCard: index===radioCard?true:false}">
                    <div class="discount">{{ item.discount }}{{ $t('mine.vipType') }}</div>
                    <div class="day">
                        <p>{{ item.name }}:{{ item.days }}{{ $t('mine.vipTime') }}
                            <van-radio :name="index"
                            @click="selectCard"
                            checked-color="rgb(7, 193, 96)"></van-radio>
                        </p>
                        <p>{{ item.description }}</p>
                    </div>
                    <div class="price">
                        <span>￥{{ item.price }}</span>
                        <span>￥{{ item.origin_price }}</span>
                    </div>
                </li>
            </ul>
            </van-radio-group>
        </div>
        <!-- 支付方式 -->
        <pay-method></pay-method>
        <!-- 支付按钮 -->
        <van-button type="primary" class="to-bottom"
        @click="payClick"
        size="large" round>{{ $t('mine.payImmeatally') }}</van-button>
    </div>
</template>

<script>
import PayMethod from '../../../components/payMethod/PayMethod.vue'
export default {
  data () {
    return {
      // 季卡，年卡信息
      radioCard: 0,
      vip_cards: [],
      userInfo: {}
    }
  },
  created () {
    this.getCardsData()
    this.getUserInfo()
  },
  methods: {
    async getCardsData () {
      const { data } = await this.$http.get('vip')
      console.log(data)
      if (!data.success) {
        console.log('获取vip数据失败')
        return -1
      }
      this.vip_cards = data.data.cards
      console.log(this.vip_cards)
    },

    getUserInfo () {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      // console.log(this.userInfo)
    },

    /* 单选中的季卡 */
    selectCard () {
      console.log(this.radioCard, typeof this.radioCard)
    },

    payClick () {
      this.$toast('噢！！！此功能还没有~~~~sorry···· \n 敬请期待')
    }
  },
  components: {
    'pay-method': PayMethod
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .van-nav-bar {
        background-color: #303747;
        /deep/.van-nav-bar__title {
            color: #fff;
        }
        /* 小箭头颜色 */
        /deep/.van-icon {
            color: #fff;
        }
    }
    /* 用户信息样式 */
    .user {
        background-color: #303747;
        display: flex;
        padding: 10/@rootRem 0 10/@rootRem 20/@rootRem;
        img {
            width: 40/@rootRem;
            height: 40/@rootRem;
            border-radius: 50%;
            margin-right: 5/@rootRem;
        }
        .info {
            color: #f5f5f5;
            font-size: 14/@rootRem;
            p {
                &:last-of-type {
                    font-size: 12/@rootRem;
                }
            }
        }
    }
    /* 用户信息样式 */
    /* 三大特权样式 */
    .priviage-3 {
        padding-left: 15/@rootRem;
        h3 {
            font-size: 14/@rootRem;
        }
        ul {
            display: flex;
            li {
                width: 33%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                span {
                    font-size: 12/@rootRem;
                    color: #7d7e80;
                    padding: 10/@rootRem 0;
                }
            }
        }
    }
    /* 三大特权样式 */
    /* 年卡季卡样式 */
    .card {
        margin: 15/@rootRem 0;
        ul {
            display: flex;
            flex-wrap: wrap;
        }
        li {
            width: 35%;
            padding: 10/@rootRem;
            padding-top: 20/@rootRem;
            box-sizing: border-box;
            background-color: #f5f5f5;
            border-radius: 10/@rootRem;
            overflow: hidden;
            position: relative;
            margin-left: 20/@rootRem;
            .discount {
                width: 35/@rootRem;
                height: 20/@rootRem;
                background-color: #ed504a;
                color: #fff;
                font-size: 14/@rootRem;
                text-align: center;
                line-height: 20/@rootRem;
                border-radius: 5/@rootRem;
                border-bottom-left-radius: 0;
                position: absolute;
                top: 0;
                left: 0;
            }
            .day {
                p {
                    &:first-of-type {
                        font-size: 14/@rootRem;
                        position: relative;
                        .van-radio {
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                    &:last-of-type {
                        font-size: 12/@rootRem;
                        color: #9faba1;
                    }
                }
            }
            .price {
                margin-top: 10/@rootRem;
                span {
                    &:first-of-type {
                        font-size: 26/@rootRem;
                        color: #60b86a;
                        padding-right: 10/@rootRem;
                    }
                    &:last-of-type {
                        font-size: 13/@rootRem;
                        color: #808080;
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
    .activeCard {
        background-color: #ecfef0!important;
    }
    /* 年卡季卡样式 */
    /* 支付按钮 */
    .to-bottom {
        position: fixed;
        width: 80%;
        bottom: 10/@rootRem;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    /* 支付按钮 */
</style>
