<template>
    <div class="personal">
        <van-nav-bar class="marginB" :title="$t('mine.personalInfo')" left-arrow @click-left="$router.back()"/>
        <van-cell-group>
            <!-- 头像部分 -->
            <van-cell :title="$t('mine.head')" center>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
                <img src="../../assets/images/login/kmr.jpeg" alt="">
            </template>
            </van-cell>
            <!-- 昵称部分 -->
            <van-cell :value="userInfo.user_name" :title="$t('mine.user_name')" is-link to="/personalcenter/editusername" />
            <!-- 性别部分 -->
            <van-cell is-link :value="sex" :title="$t('mine.userSex')" @click="showSexAction = true" />
            <van-action-sheet v-model="showSexAction" :title="$t('mine.chooseSex')">
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell :title="$t('mine.man')" clickable @click="sexRadioClick('1')">
                        <template #right-icon>
                            <van-radio name="1" />
                        </template>
                        </van-cell>
                        <van-cell :title="$t('mine.woman')" clickable @click="sexRadioClick('2')">
                        <template #right-icon>
                            <van-radio name="2" />
                        </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-action-sheet>

            <!-- 生日部分 -->
            <van-cell is-link :value="selectData" :title="$t('mine.Brithday')" @click="showBirthdayAction = true" />
            <van-action-sheet v-model="showBirthdayAction" :title="$t('mine.chooseDate')">
                <van-datetime-picker v-model="currentDate" type="date"
                :min-date="minDate"
                :max-date="maxDate" @confirm="getBirthday" @cancel="cancelBirthday"/>
            </van-action-sheet>

            <!-- 手机号码 -->
            <van-cell class="marginB" :value="userInfo.phone | hidePhone" :title="$t('mine.phoneNumber')"/>
        </van-cell-group>
        <van-button type="default" size="large" @click="loginExit">{{ $t('mine.logout') }} </van-button>
    </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      showSexAction: false,
      showBirthdayAction: false,
      radio: '',
      sex: '',
      // 日期的设置
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 12, 30),
      currentDate: new Date(),
      selectData: ''
    }
  },
  filters: {
    hidePhone: function (value) {
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
  watch: {
    radio: function () {
      if (this.radio === '1') {
        this.sex = this.$t('mine.man')
      } else if (this.radio === '2') {
        this.sex = this.$t('mine.woman')
      }
      this.userInfo.sex = this.sex
      this.setUserInfo(this.userInfo)
      // this.$toast('个人资料修改成功')
      this.$toast(this.$t('mine.infoTip')) 
    }
  },
  created () {
    this._initSexAndBir()
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations([
      'setUserInfo',
      'exitLogin'
    ]),
    _initSexAndBir () {
      if (!this.userInfo.sex) {
        // this.sex = '未填写'
        this.sex = this.$t('mine.noInput')
      } else {
        this.sex = this.userInfo.sex
      }
      if (!this.userInfo.birthday) {
        // this.selectData = '未填写'
        this.selectData = this.$t('mine.noInput')
      } else {
        this.selectData = this.userInfo.birthday
      }
    },
    // 性别的单选,num是字符
    sexRadioClick (num) {
      this.radio = num
      // 隐藏选项
      this.showSexAction = false
    },

    getBirthday (data) {
      // console.log(data.getFullYear())
      this.selectData = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate()}`
      this.showBirthdayAction = false
      this.userInfo.birthday = this.selectData
      this.setUserInfo(this.userInfo)
      // this.$toast('个人资料修改成功')
      this.$toast(this.$t('mine.infoTip')) 
    },
    cancelBirthday () {
      this.showBirthdayAction = false
    },

    // 退出登录
    loginExit () {
      // 暂时不清空
      // this.setUserInfo({})
      // 把用户信息清除
      // console.log(this.$store)
      this.$dialog.confirm({
        message: this.$t('mine.loginInfo')
      })
        .then(() => {
          // on confirm，确认
          this.$toast(this.$t('mine.infoSuccess'))
          this.exitLogin()
          this.$router.back()
        })
        .catch(() => {
          // on cancel，取消
        })
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    img {
        width: 40/@rootRem;
        height: 40/@rootRem;
    }
    .personal {
        height: 667/@rootRem;
        background-color: #f5f5f5;
        .marginB {
            margin-bottom: 10/@rootRem;
        }
    }
</style>
