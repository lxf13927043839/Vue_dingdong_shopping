<template>
    <div>
        <router-view></router-view>

        <!-- 底部tabbar区域 -->
        <van-tabbar v-model="tabbarActiveIndex" @change="onChangeTabbar">
            <van-tabbar-item to="/home">
                <span>{{ $t("home.home") }}</span>
                <template #icon="homeProps">
                    <img :src="homeProps.active ? homeIcon.active : homeIcon.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/home/category">
                <span>{{ $t("home.category") }}</span>
                <template #icon="cateProps">
                    <img :src="cateProps.active ? cateIcon.active : cateIcon.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/home/eat">
                <span>{{ $t("home.eat") }}</span>
                <template #icon="eatProps">
                    <img :src="eatProps.active ? eatIcon.active : eatIcon.inactive" />
                </template>
            </van-tabbar-item>
            <!-- 购物车徽标的显示，需要用户登录、数量不为0 -->
            <van-tabbar-item to="/home/shopcar"
            :class="{ 'hide-badge': hideBadge}"
            :badge="totalProductNum" >
                <span>{{ $t("home.cart") }}</span>
                <template #icon="carProps">
                    <img ref="shopCarRef" :src="carProps.active ? carIcon.active : carIcon.inactive" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/home/mine">
                <span>{{ $t("home.mine") }}</span>
                <template #icon="userProps">
                    <img :src="userProps.active ? userIcon.active : userIcon.inactive" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      // tabbar数据，以及对应的图片
      tabbarActiveIndex: 0,
      homeIcon: {
        active: require('../../assets/images/tabbar/home_selected.png'),
        inactive: require('../../assets/images/tabbar/home_default.png')
      },
      cateIcon: {
        active: require('../../assets/images/tabbar/category_selected.png'),
        inactive: require('../../assets/images/tabbar/category_default.png')
      },
      eatIcon: {
        active: require('../../assets/images/tabbar/eat_selected.png'),
        inactive: require('../../assets/images/tabbar/eat_default.png')
      },
      carIcon: {
        active: require('../../assets/images/tabbar/shoppingcart_selected.png'),
        inactive: require('../../assets/images/tabbar/shoppingcart_default.png')
      },
      userIcon: {
        active: require('../../assets/images/tabbar/mine_selected.png'),
        inactive: require('../../assets/images/tabbar/mine_default.png')
      }
    }
  },
  computed: {
    ...mapGetters([
      'totalProductNum'
    ]),
    ...mapState([
      'loginState',
      'vuexTabbarIndex'
    ]),
    // 是否需要显示徽标
    hideBadge: function () {
      // 没有数量情况下，直接隐藏
      if (this.totalProductNum <= 0) {
        return true
      } else {
        // 有数量的情况还需要，判断用户是否登录了
        if (this.loginState) {
          return false
        } else {
          return true
        }
      }
    }
  },
  created () {
    this.tabbarActiveIndex = this._iniTtabbarIndex()
    console.log(this.tabbarActiveIndex)
  },
  watch:{
    vuexTabbarIndex: function (newValue, oldValue) {
      console.log('watch'+ newValue)
      this.tabbarActiveIndex = newValue
      window.sessionStorage.setItem('tabbarActiveIndex', newValue)
    }
  },
  mounted () {
    this.$nextTick(() => {
    // console.log(this.$refs.shopCarRef.getBoundingClientRect)
      var position = this.$refs.shopCarRef.getBoundingClientRect()
      this.setShopCarPosition({
        x: position.left,
        y: position.top
      })
      // console.log(position.x, position.y)
    })
  },
  methods: {
    ...mapMutations([
      'setShopCarPosition',
      'changeTabbarIndex'
    ]),
    // 需要手动去点击才会触发
    onChangeTabbar (index) {
      window.sessionStorage.setItem('tabbarActiveIndex', index)
      // 同步一下vuex中的索引，为了“去逛逛”和首页图标切换，没问题
      this.changeTabbarIndex(index)
    },
    // 初始化底部导航栏的索引，刷新时候能跟页面同步
    _iniTtabbarIndex () {
      var index = window.sessionStorage.getItem('tabbarActiveIndex')
      // console.log(Object.prototype.toString.call(index))
      if (index === null) {
        return 0
      }
      index = parseInt(index)
      return index
    }
  }
}
</script>

<style lang="less" scoped>
    .van-tabbar {
        border: 1px solid #eee;
        min-width: 320px;
        max-width: 768px;
        left: 50%;
        transform: translate(-50%);
    }
    /* 当0的时候隐藏，小徽标 */
    .hide-badge {
      /deep/.van-info {
        display: none;
      }
    }
</style>
