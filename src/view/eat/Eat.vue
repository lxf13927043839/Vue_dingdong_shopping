<template>
    <div>
        <skeleton v-if="loading"></skeleton>
        <div v-else>

        <div class="header">
          <div class="search">
            <van-search shape="round" background="#fff" :placeholder="$t('eat.pleaseHolder')"
            @focus="searchFocus"/>
          </div>
          <div class="title">
            <span>{{ $t('eat.menu') }}</span>
          </div>
          <!-- 滚动菜单 -->
          <div class="food-scroll-wrapper" ref="foodScrollRef">
              <ul class="food-wrapper" ref="ulRef">
                  <li v-for="(item, index) in foodCateListData" :key="item.id" ref="liRef"
                  @click="clickfoodItem(index)"
                  :class="{ activeFood: activeIndex === index }">
                      {{ item.name }}
                  </li>
              </ul>
          </div>
          <!-- 展开项 -->
          <van-dropdown-menu class="dropMenu" v-if="needDropMenu" active-color="#3cb963">
              <van-dropdown-item title="全部" ref="allRef">
                <ul class="allFood">
                  <div class="menu-name"><span>菜单分类</span></div>
                  <li v-for="(item, index) in foodCateListData" :key="item.id"
                  @click="clickDropMenuItem(index)"
                  :class="{ activeFood: activeIndex === index }">
                    {{ item.name }}
                  </li>
                </ul>
              </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!-- 菜单展示区域 -->
        <div class="food-show">
          <food-show :food-list-data="foodListData"></food-show>
        </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import foodDetail from './DetailFood.vue'
// 导入骨架屏
import skeleton from './skeleton'

export default {
  data () {
    return {
      // 食物分类数据
      foodCateListData: [],
      // 滚动菜单索引
      activeIndex: 0,
      bs: null,
      needDropMenu: true,
      // 食物列表
      foodListData: [],
      loading: true
    }
  },
  components: {
    'food-show': foodDetail,
    skeleton
  },
  created () {
    this.getfoodCateListData()
    this.getfoodListData(0)
  },
  methods: {
    async getfoodCateListData () {
      const { data } = await this.$http.get('recipe/allScene')
      // console.log(data)
      if (data.success) {
        this.foodCateListData = data.data.list
        this.loading = false

        this.$nextTick(() => {
          var totalWidth = 0
          var liCount = this.$refs.ulRef.children.length
          if (liCount <= 0) {
            return
          }
          for (var i = 0; i < liCount; i++) {
            totalWidth += (this.$refs.liRef[i].offsetWidth + 1)
          }
          // 没有超出的话，就不用操作其他的了
          if (totalWidth <= this.$refs.foodScrollRef.offsetWidth) {
            return -1
          }
          var marginLeft = Math.ceil((parseFloat(window.getComputedStyle(this.$refs.liRef[1]).marginLeft)))
          // console.log(marginLeft)
          // 精确的话数量减 1
          totalWidth += marginLeft * (liCount)
          // console.log(totalWidth)
          this.$refs.ulRef.style.width = totalWidth + 'px'
          this.initBScroll()
        })
      }
    },
    /*
      参数只要传数字就行，他的api的名字比较固定
    */
    async getfoodListData (params) {
      params++
      params = params.toString().padStart(2, '0')
      const { data } = await this.$http.get('recipe/menulist/lk' + params)
      // console.log(data)
      if (data.success) {
        this.foodListData = data.data.big_recommend.list
      }
      console.log(this.foodListData)
    },
    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.food-scroll-wrapper', {
          probeType: 2,
          click: true,
          scrollX: true,
          scrollY: false
          // eventPassthrough: 'vertical'
        })
      } else {
        this.bs.refresh()
      }
    },
    /*
      处理菜单项点击事件
    */
    clickfoodItem (index) {
      this.activeIndex = index
      this.foodMoveToTop()
      this.getfoodListData(index)
    },

    /*
      处理下拉菜单点击事件
    */
    clickDropMenuItem (index) {
      this.activeIndex = index
      this.$refs.allRef.toggle(false)
      this.foodMoveToTop()
      this.getfoodListData(index)
    },

    foodMoveToTop () {
      var el = this.$refs.liRef[this.activeIndex]
      // 单位是ms
      var time = 1000
      this.bs.scrollToElement(el, time, 0, 0)
    },

    searchFocus () {
      this.$toast('暂时没有实现~~~搜索不了的')
    }
  }
}
</script>

<style lang="less" scoped>
  @rootRem: 37.5rem;
  .header {
    width: 100%;
    position: fixed;
    z-index: 1;
    background-color: #fff;
    .title {
      font-size: 18/@rootRem;
      border-left: 5/@rootRem solid #75a342;
      margin-left: 10/@rootRem;
      padding-left: 5/@rootRem;
    }
    .food-scroll-wrapper {
      overflow: hidden;
      .food-wrapper {
        display: inline-block;
        vertical-align: middle;
        li {
          float: left;
          font-size: 13/@rootRem;
          border-radius: 10/@rootRem;
          border: 1/@rootRem solid lightgray;
          line-height: 25/@rootRem;
          height: 25/@rootRem;
          margin: 10/@rootRem 0 0;
          padding: 0 5/@rootRem;
          color: gray;
          &+li {
            margin-left: 5/@rootRem;
          }
        }
      }
    }
    .activeFood {
      /* 激活的菜单样式 */
      color: #3cb963;
      border: 1/@rootRem solid #3cb963 !important;
    }
    /*下拉菜单样式*/
    .dropMenu {
      position: absolute;
      right: 0;
      top: 85/@rootRem;
    }
    /deep/.van-dropdown-menu__bar {
      padding-right: 15/@rootRem;
      box-shadow: none;
      height: 30/@rootRem;
      line-height: 30/@rootRem;
    }
    /deep/.van-dropdown-menu__title {
      font-size: 13/@rootRem;
    }
    .menu-name {
      font-size: 14/@rootRem;
      margin: 15/@rootRem 0;
    }
    /* 下拉菜单中的选项布局样式 */
    .allFood {
      padding-left: 20/@rootRem;
      li {
        display: inline-block;
        text-align: center;
        width: 60/@rootRem;
        box-sizing: border-box;
        font-size: 13/@rootRem;
        border-radius: 10/@rootRem;
        border: 1/@rootRem solid lightgray;
        line-height: 30/@rootRem;
        height: 30/@rootRem;
        margin-right: 20/@rootRem;
        margin-top: 10/@rootRem;
      }
    }
  }
  .food-show {
    padding-top: 115/@rootRem;
  }
</style>
