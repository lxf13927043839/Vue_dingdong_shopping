<template>
    <div class="mine-wrapper">
        <!-- 登录个人信息 -->
        <div class="header">
            <div class="title">{{ $t('mine.title') }}</div>
            <div class="user" @click="clickToPersonalCenter">
                <img src="../../assets/images/login/kmr.jpeg" alt="">
                <!-- 如果有登录，显示用户信息 -->
                <router-link to="/login" v-if="!loginState">{{ $t('mine.login') }}</router-link>
                <div class="userRegister" v-else>
                    <p>{{ $t('mine.userName') }}: {{ userInfo.user_name }}</p>
                    <p>{{ $t('mine.phone') }}: {{ userInfo.phone | hidePhone }}</p>
                </div>
            </div>
        </div>
        <!-- 用户的相关信息 -->
        <div class="userInfo">
            <van-cell is-link to="/mine/myorder" center :value="$t('mine.allOrder')">
                <template #title>
                    <div class="cell-center">
                        <van-icon name="label" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.myOrder') }}</span>
                    </div>
                </template>
            </van-cell>
            <div class="order">
                <ul>
                    <li>
                        <van-icon name="cart-circle-o" size="0.8rem"/>
                        <span>{{ $t('mine.waitingPay') }}</span>
                    </li>
                    <li>
                        <van-icon name="gift-o" size="0.8rem"/>
                        <span>{{ $t('mine.waitingReceive') }}</span>
                    </li>
                    <li>
                        <van-icon name="smile-comment-o" size="0.8rem"/>
                        <span>{{ $t('mine.waitingComment') }}</span>
                    </li>
                    <li>
                        <van-icon name="cash-back-record" size="0.8rem"/>
                        <span>{{ $t('mine.waitingFeedback') }}</span>
                    </li>
                </ul>
            </div>
            <van-cell is-link to="/mine/coupon" center>
                <template #title>
                    <div class="cell-center">
                        <van-icon name="gold-coin" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.myBill') }}</span>
                    </div>
                </template>
            </van-cell>
            <van-cell is-link to="/mine/myaddress" center>
                <template #title>
                    <div class="cell-center">
                        <van-icon name="todo-list" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.myLocation') }}</span>
                    </div>
                </template>
            </van-cell>
            <van-cell is-link to="/mine/vip" center class="TopBottomMargin">
                <template #title>
                    <div class="cell-center">
                        <van-icon name="vip-card" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.myCar') }}</span>
                        <van-tag type="danger" round size="medium">NEW</van-tag>
                    </div>
                </template>
            </van-cell>
            <van-cell is-link to="" center :value="$t('mine.servierTime')">
                <template #title>
                    <div class="cell-center">
                        <van-icon name="phone" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.servier') }}</span>
                    </div>
                </template>
            </van-cell>
            <van-cell is-link to="" center @click="suggest">
                <template #title>
                    <div class="cell-center">
                        <van-icon name="comment-circle" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.feedback') }}</span>
                    </div>
                </template>
            </van-cell>
            <van-cell is-link to="/language" center>
                <template #title>
                    <div class="cell-center">
                        <van-icon name="clock" color="#45c763" size="0.6rem"/>
                        <span>{{ $t('mine.switchLanguage') }}</span>
                    </div>
                </template>
            </van-cell>
        </div>
        <div class="over">{{ $t('mine.version') }}</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    // 通过mapstate映射计算属性
    ...mapState([
      'userInfo',
      'loginState'
    ])
  },
  // 过滤器，把手机号4-7换成*号
  filters: {
    hidePhone: function (value) {
      // 如果为空的话，就不执行了
      if (!value) {
        return
      }
      value = value.split('')
      for (var i = 3; i < 7; i++) {
        value[i] = '*'
      }
      return value.join('')
    }
  },
  methods: {
    ...mapMutations([
      'initUserInfo',
      'successLogin',
      'exitLogin'
    ]),
    clickToPersonalCenter () {
      if (this.loginState) {
        this.$router.push('/mine/personalcenter')
      }
    },

    suggest () {
      this.$dialog.alert({
        title: this.$t('mine.feedback'),
        message: this.$t('mine.tip3')
      }).then(() => {
      // on close
      })
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .header {
        background-color: #3bba63;
        .title {
            text-align: center;
            height: 45/@rootRem;
            line-height: 45/@rootRem;
            color: #fff;
            font-size: 16/@rootRem;
        }
        .user {
            padding: 10/@rootRem;
            display: flex;
            align-items: center;
            img {
                width: 70/@rootRem;
                height: 70/@rootRem;
                border-radius: 50%;
                background-color: #fff;
            }
            a,
            p {
                font-size: 14/@rootRem;
                color: #fff;
                padding-left: 15/@rootRem;
            }
        }
    }
    .userInfo {
        background-color: #f5f5f5;
        .cell-center {
            display: flex;
            align-items: center;
            span {
                padding-left: 5/@rootRem;
            }
        }
        .order {
            padding: 15/@rootRem 0;
            background-color: #fff;
            ul {
                display: flex;
            }
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 25%;
                box-sizing: border-box;
                span {
                    font-size: 12/@rootRem;
                    color:#7d7e80;
                }
            }
        }
    }
    .over {
        color: #808080;
        font-size: 13/@rootRem;
        text-align: center;
        background-color: #fff;
    }
    .TopBottomMargin {
        margin: 10/@rootRem 0;
    }
</style>
