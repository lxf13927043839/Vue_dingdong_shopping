<template>
    <div class="edit-address">
        <van-nav-bar :title="$t('order.editLocation')" class="margin-b-10" left-arrow @click-left="$router.back()"/>
        <!-- 添加地址 -->
        <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        :address-info="userAddress[index]"
        show-search-result
        show-delete
        :save-button-text="$t('order.save')"
        @save="onSave"
        @delete="onDelete"/>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { areaList } from '@vant/area-data'
export default {
  data () {
    return {
      areaList,
      index: 0
    }
  },
  created () {
    this.initAddressIndex()
  },
  computed: {
    ...mapState([
      'userAddress'
    ])
  },
  methods: {
    initAddressIndex () {
      this.index = this.$route.query.index
    },

    ...mapMutations([
      'upDateAddress',
      'deleteAddress'
    ]),
    /*
      这里不知道用户会修改那些信息，只能重新替换一个对象
    */
    onSave (info) {
      console.log(info)
      var id = new Date()
      var newAdd = {}
      // id必须是唯一的，这里用时间确保唯一性
      for (var key in info) {
        newAdd[key] = info[key]
      }
      newAdd.id = id.getTime()
      newAdd.address = info.province + info.city + info.county + info.addressDetail

      this.upDateAddress({
        index: this.index,
        address: newAdd
      })
      console.log(this.$store)
      this.$router.back()
    },
    /*
      删除,已经自带确认框
    */
    onDelete () {
      this.deleteAddress(this.index)
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
@rootRem: 37.5rem;
    .edit-address {
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
    .margin-b-10 {
        margin-bottom: 10/@rootRem;
    }
</style>
