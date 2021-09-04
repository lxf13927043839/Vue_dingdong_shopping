<template>
    <div class="right-side">
        <div class="drop-menu-wrapper" ref="menuRef">
            <ul class="menu-wrapper" ref="ulWrapperRef">
                <li v-for="(item, index) in categoryListMenuData" :key="item.id" ref="liRef"
                @click="clickMenuItem(index)"
                :class="{ activeCate: activeIndex === index }">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <!-- 通过插槽可以自定义 DropdownItem 的内容，此时需要使用实例上的 toggle 方法手动控制菜单的显示。 vant官网-->
            <van-dropdown-menu v-if="needShowMenu" active-color="#3cb963">
              <van-dropdown-item title="全部" ref="dropMenuRef">
                <ul class="menuItem">
                  <li v-for="(item, index) in categoryListMenuData" :key="item.id" @click="clickDropMenuItem(index)">
                    <van-tag :color="activeIndex===index?'#3cb963':'#000'" round  plain size="large">{{ item.name }}</van-tag>
                  </li>
                </ul>
              </van-dropdown-item>
            </van-dropdown-menu>
        <!-- 右侧商品详情 要注意props命名的问题-->
        <!-- 最初始化的数据是个空数组，数据还在异步获取当中，所以等数据来了再创建，初始化创建的时候会报错 -->
        <detail-product v-if="categoryListMenuData[activeIndex]" :products-list-data="categoryListMenuData[activeIndex]"></detail-product>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

import DetailProduct from './DetailProduct.vue'
export default {
  data () {
    return {
      bs: null,
      activeIndex: 0,
      // 是否需要显示下拉菜单
      needShowMenu: true
    }
  },
  components: {
    'detail-product': DetailProduct
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.initBScroll()
    })
  },
  methods: {
    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.drop-menu-wrapper', {
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
      点击分类事件事件
    */
    clickMenuItem (index) {
      this.activeIndex = index
      // console.log(index)
      this.cateMoveToTop()
    },
    /*
      功能：把选中的分类，移动到最顶部
    */
    cateMoveToTop () {
      var el = this.$refs.liRef[this.activeIndex]
      // 单位是ms
      var time = 1000
      this.bs.scrollToElement(el, time, 0, 0)
    },

    onConfirm () {
      this.$refs.item.toggle()
    },
    /*
      关闭下拉分类菜单
    */
    closeDropMenu () {
      this.$refs.dropMenuRef.toggle(false)
    },
    /*
      下拉菜单点击事件
    */
    clickDropMenuItem (index) {
      this.activeIndex = index
      this.cateMoveToTop()
      this.closeDropMenu()
    }
  },
  /*
    监听数据的变化,这样才能知道数据变化，重新计算ul的宽度
  */
  watch: {
    categoryListMenuData: function (newValue) {
      // console.log(newValue)
      // 数据变化后，dom不会马上更新跟新，它是异步的
      this.$nextTick(() => {
        // 把索引置为0,同时把滑动条拉到初始位置
        this.activeIndex = 0
        // 不能用这个去拉回，因为dom的结构改变了
        // this.cateMoveToTop()
        // console.log(this.bs.x)

        var liCount = this.$refs.ulWrapperRef.children.length
        // var liWidth = this.$refs.liRef[0].offsetWidth
        // 宽度需要进行累加，宽度不一样。
        if (liCount <= 0) {
          return
        }
        var totalWidth = 0
        // offsetWidth的取值可能会偏小，它是取整数
        for (var i = 0; i < liCount; i++) {
          totalWidth += (this.$refs.liRef[i].offsetWidth + 1)
        }
        // 宽度超出容器的时候在设置ul，和下拉菜单
        // 没有超出的话，就不用操作其他的了
        if (totalWidth <= this.$refs.menuRef.offsetWidth) {
          this.needShowMenu = false
          return
        }
        this.needShowMenu = true

        // 放在这个位置是有讲究的，父元素的v-if的控制条件会影响到ref的读取
        this.$nextTick(() => {
          // 收回下拉菜单
          // console.log(this.$refs.dropMenuRef)
          // this.$refs.dropMenuRef.toggle(false)
          this.closeDropMenu()
        })
        this.$refs.ulWrapperRef.style.width = totalWidth + 'px'
        // betterScroll需要重新获取宽度
        this.bs.scrollBy(Math.abs(this.bs.x), 0, 0)
        this.initBScroll()
        // console.log(totalWidth)
      })
    }
  },
  props: {
    categoryListMenuData: Array
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .drop-menu-wrapper {
        border-bottom: 1/@rootRem solid #e8e9e8;
        box-sizing: border-box;
        overflow: hidden;
        padding-right: 20/@rootRem;
        .menu-wrapper {
            display: inline-block;
            vertical-align: middle;
            li {
                float: left;
                height: 44.8/@rootRem;
                line-height: 44.8/@rootRem;
                font-size: 13/@rootRem;
                padding: 0 15/@rootRem;
            }
        }
    }
    .activeCate {
      color: #3cb963;
    }
    /* 修改vant下拉菜单样式 */
    /deep/.van-dropdown-menu {
      position: absolute;
      right: 0/@rootRem;
      top: 55/@rootRem;
      .van-dropdown-menu__bar {
        height: 42/@rootRem;
        width: 60/@rootRem;
        box-shadow: none;
        padding: 0 10/@rootRem;
        .van-dropdown-menu__title {
          font-size: 13/@rootRem;
        }
      }
    }
    /deep/.van-dropdown-item {
      left: 95/@rootRem;
      bottom: 50/@rootRem;
    }
    /* 菜单项的样式 */
    .menuItem {
      li {
        float: left;
        margin: 5/@rootRem;
      }
    }
    /* 菜单项的样式 */
</style>
