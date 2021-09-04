<template>
    <div class="my-address">
        <van-nav-bar :title="$t('order.addLocation')" left-arrow @click-left="$router.back()"/>
        <div class="no-address" v-if="userAddress.length <= 0">
            <img src="../../../assets/images/order/noAddress.png" alt="">
            <!-- <span>还没有添加过地址呢，来一个吧~~~</span> -->
            <span>{{ $t('order.addTip') }}</span>
        </div>
        <!-- 显示地址 -->
        <div class="showAddress" v-else>
            <van-address-list
            v-model="chosenAddressId"
            :list="userAddress"
            :default-tag-text="$t('order.defaultText')"
            @edit="onEditAddress"
            @select="onReceiveAddress"
            />
        </div>
        <van-button type="primary" round size="large" class="add-button" @click="$router.push('/mine/addaddress')">{{ $t('order.addLocation') }}</van-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chosenAddressId: '',
      // 是否作为收货地址
      receiveAddress: false
    }
  },
  computed: {
    ...mapState([
      'userAddress'
    ])
  },
  created () {
    this._initReceiveAddress()
  },
  methods: {
    onEditAddress (item, index) {
      console.log(item)
      console.log(index)
      this.$router.push({
        path: '/mine/editaddress',
        query: {
          index: index
        }
      })
    },
    /*
      作为收货地址
    */
    onReceiveAddress (item, index) {
      // 把地址信息传回去
      // console.log(item, index)
      if (this.receiveAddress) {
        this.$router.push({
          path: '/settlement',
          query: {
            name: item.name,
            tel: item.tel
          }
        })
      }
    },
    /*
      初始化是否收货地址
    */
    _initReceiveAddress () {
      if (this.$route.query.receive) {
        this.receiveAddress = true
      } else {
        this.receiveAddress = false
      }
      console.log(this.receiveAddress)
    } 
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .my-address {
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
        .no-address {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 60%;
            }
            span {
                color: #808080;
                font-size: 12/@rootRem;
            }
        }
        .add-button {
            width: 70%;
            position: absolute;
            bottom: 10/@rootRem;
            left: 50%;
            transform: translate(-50%);
        }
        /* 把原来的地址自带的按钮去除 */
        .showAddress {
            .van-address-list__bottom {
                display: none;
            }
        }
    }
</style>
