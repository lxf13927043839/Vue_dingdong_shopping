<template>
    <div class="langguage">
        <van-nav-bar right-text="保存" title="请选择语言" left-arrow
        @click-right="onSaveLanguage"
        @click-left="$router.back()"/>

        <!-- 语言选择 -->
        <div class="choose-language">
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell title="中文" clickable @click="radio = '1'">
                <template #right-icon>
                    <van-radio name="1" />
                </template>
                </van-cell>
                <van-cell title="English" clickable @click="radio = '2'">
                <template #right-icon>
                    <van-radio name="2" />
                </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        </div>
    </div>    
</template>

<script>
import { Locale } from 'vant'
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'
// Locale.use('en-US', enUS)
export default {
  data () {
    return {
      radio: '1'
    }
  },
  created () {
    this._initRadio()
  },
  methods: {
    // i18n 不是 i小写L 8容易错
    onSaveLanguage () {
      // console.log(this.$i18n)
      if (this.radio === '1') {
        // 切换中文
        Locale.use('zh-CN', zhCN)
        this.$i18n.locale = 'zh-CN'
        window.sessionStorage.setItem('language', 'zh-CN')
      } else if (this.radio === '2') {
        // 切换英文
        Locale.use('en-US', enUS)
        this.$i18n.locale = 'en-US'
        window.sessionStorage.setItem('language', 'en-US')
      }
      // this.$toast('保存成功')
      this.$toast(this.$t('common.saveSuccess'))
      this.$router.back()
    },
    _initRadio () {
      var language = window.sessionStorage.getItem('language')
      if (!language) {
          this.radio = '1'
          return null
      }
      if (language === 'zh-CN') {
        this.radio = '1'
      } else if (language === 'en-US') {
        this.radio = '2'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .langguage {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #f5f5f5;
    }
    .choose-language {
        margin-top: 10/@rootRem;
    }
    /* 小箭头颜色 */
    .van-nav-bar {
        /deep/.van-icon {
            color:rgb(40, 190, 87);
        }
    }
    /deep/.van-nav-bar__text {
        color:rgb(40, 190, 87);
    }
</style>
