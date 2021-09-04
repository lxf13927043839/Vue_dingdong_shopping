<template>
    <div class="login-wrapper">
        <div class="login-main">
            <div class="head-img">
                <img src="../../assets/images/login/normal.png" ref="imgSrc" alt="">
            </div>
            <!-- 登录区域 -->
            <van-tabs @click="onClickTabs" animated>
                <van-tab :title="$t('login.title')">
                    <!-- 登录区域，输入账号，密码，暂时没有搞表单验证-->
                    <van-form ref="loginRef">
                        <van-field v-model="phone" @click="ClickSwitchHeaderImg('phone')" clearable
                        required :label="$t('login.phoneNumber')"
                        @input="checkPhoneNum"
                        :placeholder="$t('login.phoneInput')"/>
                        <van-field v-model="sms" v-if="!showAccount" center clearable :label="$t('login.message')"
                        :placeholder="$t('login.varify')">
                            <template #button>
                                <van-button size="small" type="primary"
                                :disabled="ableSendCode" @click="clickSendCode">{{second60Down === 60? $t('login.sendVerify'):$t('login.hasSend')+' '+second60Down+' '+$t('login.second')}}</van-button>
                            </template>
                        </van-field>
                        <!-- 账号密码区域 -->
                        <div class="account" v-if="showAccount">
                            <van-field v-model="password" clearable type="password" :label="$t('login.pass')"
                            required
                            @click="ClickSwitchHeaderImg('pwd')"
                            :placeholder="$t('login.passTip2')" />
                        </div>
                    </van-form>
                        <!-- 登录按钮 -->
                        <van-button type="info" size="large" class="marginTB15"
                        @click="clickLogin">{{ $t('login.login') }}</van-button>
                        <p @click="showAccount=!showAccount" :class="{  colorBlue :showAccount }">{{showAccount?$t('login.smsMessage'):$t('login.switchLoginMsg')}}</p>
                </van-tab>
                <van-tab :title="$t('login.resgin')">
                    <!-- 需要有表单才能进行验证 -->
                    <van-form ref="registerRef">
                        <!-- 手机号 -->
                        <van-field v-model="phone" clearable required
                        @click="ClickSwitchHeaderImg('phone')"
                        name="phone1"
                        :label="$t('login.phoneNumber')" :placeholder="$t('login.phoneInput')"/>
                        <!-- 密码 -->
                        <van-field v-model="password" clearable
                        @click="ClickSwitchHeaderImg('pwd')"
                        type="password" :label="$t('login.pass')" required :placeholder="$t('login.passTip2')" />
                        <van-button type="info" size="large"
                        @click="clickRegister"
                        class="marginTB15">{{ $t('login.resgin') }}</van-button>
                    </van-form>
                </van-tab>
            </van-tabs>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            {{ $t('login.otherMethods') }}
            </van-divider>
            <div class="other-login" @click="$toast($t('common.unrealized'))">
                <div>
                    <img src="../../assets/images/login/qq.svg" alt="">
                    <span>{{ $t('login.qqchant') }}</span>
                </div>
                <div>
                    <img src="../../assets/images/login/wx.png" alt="">
                    <span>{{ $t('login.wechat') }}</span>
                </div>
            </div>
            <div class="tip">
                <p>{{ $t('common.tipTile') }}</p>
                <span>{{ $t('login.tipContent') }}</span>
                <a href="javascirpt:void(0);" @click.prevent="$toast($t('login.tip'))">{{ $t('login.tip') }}</a>
                <a href="javascirpt:void(0);" @click.prevent="$toast($t('login.tipProcy'))">{{ $t('login.tipProcy') }}</a>
            </div>
        </div>
        <!-- 关闭按钮 -->
        <van-icon name="close" class="close" @click="$router.back()"/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      phone: '',
      sms: '',
      password: '',
      // 切换账号密码
      showAccount: false,
      // 验证规则,暂时没有使用
      phoneRule: [
        {
          pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号码'
        }
      ],
      // 用户注册信息
      userRegisterInfo: {},
      // 是否能发送验证码,这个true跟false容易搞混，true是禁用
      ableSendCode: true,
      second60Down: 60
    }
  },
  methods: {
    ...mapMutations([
      'setUserInfo',
      'successLogin'
    ]),
    onClickTabs (name, title) {
      this.phone = ''
      this.password = ''
      this.$toast(title)
      this.$refs.imgSrc.src = require('../../assets/images/login/normal.png')
    },
    // 切换图片,根据是账号还是密码，切换不同的图片，在vue-cli中，不能直接使用img的路径，要用require
    ClickSwitchHeaderImg (type) {
      if (type === 'phone') {
        this.$refs.imgSrc.src = require('../../assets/images/login/greeting.png')
      } else if (type === 'pwd') {
        this.$refs.imgSrc.src = require('../../assets/images/login/blindfold.png')
      }
    },
    /*
      对手机号码内容改变进行验证，满足条件才能发送验证码
    */
    checkPhoneNum () {
      var phoneResult = this.phoneRule[0].pattern.test(this.phone)
      if (phoneResult) {
        this.ableSendCode = false
      } else {
        this.ableSendCode = true
      }
    },

    // 点击登陆,只能自己手动验证,密码的验证至少6位
    // vant的验证不好做，没有清空的选项
    /*
        功能：点击注册
        把获得的token，跟账号密码放在sessionStroage中，来模拟
    */
    checkInputInfo () {
      var phoneResult = this.phoneRule[0].pattern.test(this.phone)
      if (!phoneResult) {
        this.$toast(this.$t('login.pleaseInputCorrectPhoneNumber'))
        return -1
      }
      if (this.password.trim().length < 6) {
        this.$toast(this.$t('login.passTip2'))
        return -1
      }
      return 1
    },
    async clickRegister () {
      // 验证输入的信息
      if (this.checkInputInfo() === -1) {
        return
      }
      // 提交数据
      const { data } = await this.$http.post('login_code', {
        phone: this.phone,
        password: this.password
      })
      console.log(data)
      if (data.success_code !== 200) {
        this.$toast(this.$t('login.registerFail'))
        return
      }
      this.userRegisterInfo = data.data
      console.log(this.userRegisterInfo)
      // window.sessionStorage.setItem('token', this.userRegisterInfo.token)
      var userAccount = {
        phone: this.userRegisterInfo.phone,
        password: this.userRegisterInfo.password
      }
      // console.log(JSON.stringify(userAccount))
      window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount))
      // 存放到vuex中,给mine页面使用
      this.setUserInfo(this.userRegisterInfo)
      console.log(this.$store)
      this.phone = ''
      this.password = ''
      // 登录成功
      this.successLogin()
      this.$router.back()
    },
    /*
      账号密码登录功能，从session中获取数据，然后判断是否一致，模拟服务器核对
      本来是要发送给服务器去验证的
      账号密码，验证码登录使用都是同一个事件，会在里边进行区分
    */
    clickLogin () {
      // 处理账号密码
      var userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'))
      if (this.showAccount) {
        if (this.checkInputInfo() === -1) {
          return -1
        }
        // console.log(userAccount)
        if (!userAccount) {
          this.$toast(this.$t('login.phoneNoRegiste'))
          return -1
        }
        if (this.phone !== userAccount.phone || this.password !== userAccount.password) {
          this.$toast(this.$t('login.wrong'))
          return -1
        }
      } else if (!this.showAccount) {
      // 处理验证码,要核对手机号
        var phoneResult = this.phoneRule[0].pattern.test(this.phone)
        if (!phoneResult) {
          this.$toast(this.$t('login.pleaseInputCorrectPhoneNumber'))
          return -1
        }
        // 判断手机号是否已经注册,条件的顺序也是有讲究的，userAccount要在前边
        if (!userAccount || this.phone !== userAccount.phone) {
          this.$toast(this.$t('login.phoneNoRegiste'))
          return -1
        }
        var data = JSON.parse(window.sessionStorage.getItem('sendcode'))
        // 注意data是number类型
        if (!data || (this.sms - 0) !== data) {
          this.$toast(this.$t('login.wrongSMS'))
          return -1
        }
        // console.log(data.sendcode)
      }
      console.log(this.$store)
      this.$toast(this.$t('login.loginSuccess'))
      // 登录成功
      this.successLogin()
      // 这个跳转函数，要放在最后，跳走了后边的语句就不执行了
      this.$router.back()
    },
    /*
      发送验证码，模拟一下,验证码是number类型
    */
    async clickSendCode () {
      const { data } = await this.$http.post('sendCode')
      // console.log(typeof data.data.code)
      this.$dialog.alert({
        title: this.$t('common.tipTile'),
        message: this.$t('login.message') + data.data.code
      })
      this.ableSendCode = true
      // 把验证码存放到sessioStorage中去
      window.sessionStorage.setItem('sendcode', data.data.code)
      this.startSecond60Down()
    },
    /*
      开始倒计时
    */
    startSecond60Down () {
      this.time = setInterval(() => {
        this.second60Down--
        if (this.second60Down === 0) {
          window.sessionStorage.removeItem('sendcode')
          clearInterval(this.time)
          this.time = null
          // 恢复60秒
          this.second60Down = 60
          // 如果号码没变化就可以重新发送
          this.checkPhoneNum()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .login-wrapper {
        height: 667/@rootRem;
        background-image: url("../../assets/images/login/back2.jpg");
        background-size: 100% 100%;
        position: relative;
        .login-main {
            background-color: rgba(255, 255, 255, .9);
            width: 340/@rootRem;
            box-sizing: border-box;
            padding: 20/@rootRem;
            padding-top: 30/@rootRem;
            border-radius: 10/@rootRem;
            position: relative;
            margin: 0 auto;
            top: 50/@rootRem;
        }
        .head-img {
            width: 70/@rootRem;
            height: 55/@rootRem;
            position: absolute;
            z-index: 1;
            left: 50%;
            transform: translate(-50%);
            top: 0;
            img {
                width: 100%;
                height: 100%;
            }
        }
        p {
            font-size: 14/@rootRem;
        }
        .other-login {
            display: flex;
            justify-content: space-around;
            padding: 20/@rootRem;
            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                img {
                    width: 22/@rootRem;
                    height: 22/@rootRem;
                }
                span {
                    font-size: 12/@rootRem;
                    color: #808080;
                }
            }
        }
        .tip {
            p,
            span {
                font-size: 16/@rootRem;
                color: #767676;
            }
            a {
                font-size: 16/@rootRem;
                &:first-of-type {
                    margin-right: 10/@rootRem;
                }
            }
        }
    }
    .marginTB15 {
        margin: 15/@rootRem 0;
    }
    .colorBlue {
        color: #1989fa;
    }
    /* 关闭按钮 */
    .close {
      position: absolute;
      right: 30/@rootRem;
      top: 50/@rootRem;
    }
    /* 关闭按钮 */
</style>
