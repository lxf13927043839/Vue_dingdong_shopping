<template>
    <div class="add-address">
        <van-nav-bar title="添加地址" left-arrow @click-left="$router.back()"/>
        <!-- 添加地址 -->
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :save-button-text="'保存并使用'"
        @save="onSave"/>
    </div>
</template>

<script>
// Vant 官方提供了一份默认的省市区数据，可以通过 @vant/area-data 引入：
import { areaList } from '@vant/area-data'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      areaList,
      searchResult: []
      // addressInfo: {}
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations([
      'addUserAddress'
    ]),
    onSave (info) {
      // this.addressInfo.name = info.name
      // this.addressInfo.tel = info.tel
      // this.addressInfo.address = info.province + info.city + info.county + info.addressDetail
      // this.addressInfo.isDefault = info.isDefault
      // 上边的操作是有问题的，都指向了同一个对象，会导致所有数据同步，可以使用局部变量处理
      console.log(info)
      var id = new Date()
      var userAdd = {}
      // id必须是唯一的，这里用时间确保唯一性
      for (var key in info) {
        userAdd[key] = info[key]
      }
      userAdd.id = id.getTime()
      userAdd.address = info.province + info.city + info.county + info.addressDetail
      this.addUserAddress(userAdd)
      console.log(this.$store)
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .add-address {
        // 为了占满全屏
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        .van-nav-bar {
            /* 小箭头颜色 */
            /deep/.van-icon {
                color:rgb(40, 190, 87);
            }
        }
    }
</style>
