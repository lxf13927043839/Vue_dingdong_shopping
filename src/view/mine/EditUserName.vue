<template>
    <div class="edit-wrapper">
        <van-nav-bar :right-text="$t('mine.confirm')" :title="$t('mine.changeNickName')" left-arrow
        @click-right="onSaveName"
        @click-left="$router.back()"/>
        <!-- <p>请输入新的昵称</p> -->
        <p>{{ $t('mine.nickName') }}</p>
        <van-field
        v-model="newName"
        rows="1"
        label-width="1.2rem"
        autosize
        :label="$t('mine.name')"
        type="textarea"
        :placeholder="$t('mine.nickName')"/>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      newName: '',
      userInfo: {}
    }
  },
  created () {
    this._getUserName()
  },
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    onSaveName () {
      if (this.newName === this.userInfo.user_name) {
        // this.$toast('您未修改昵称')
        this.$toast(this.$t('mine.noChangeName'))
      } else {
        this.userInfo.user_name = this.newName
        this.setUserInfo(this.userInfo)
        this.$toast(this.$t('mine.personal'))
      }
      this.$router.back()
    },
    _getUserName () {
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
      if (!this.userInfo) {
        return
      }
      this.newName = this.userInfo.user_name
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .edit-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        p {
            color: #969799;
            font-size: 14/@rootRem;
            padding: 15/@rootRem;
        }
    }
</style>
