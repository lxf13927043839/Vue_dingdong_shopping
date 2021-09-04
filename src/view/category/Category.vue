<template>
    <div class="container">
        <skeleton v-if="loading"></skeleton>
        <div v-else>
        <div class="search">
            <van-search shape="round" background="#fff" :placeholder="$t('category.tip')"
            @focus="onFocusSearch"/>
        </div>
        <!-- 左侧浮动 -->
        <div class="left-scroll">
            <div class="cate-wrapper" ref="cateWrapperRef">
              <!-- 左边分类选项 -->
              <ul class="cate-content" ref="cateContentRef">
                <!-- 设置index是为了点击时候知道点击了谁 -->
                <li v-for="(item, index) in categoryListData" :key="item.id">
                  <span @click.stop="clickDetailCate" :data-index="index" ref="spanRef"
                  :class="{ activeCate: activeIndex===index}">{{ item.name }}</span>
                </li>
              </ul>
            </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right-content">
          <!-- 上边顶部菜单分类 注意在子组件中的props是categoryListMenuData，在父组件的html中需要转换成横线，因为html是不分大小写的-->
          <drop-menu :category-list-menu-data="categoryListMenuData"></drop-menu>
        </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import DropMenu from './DropMenu.vue'
// 导入骨架屏
import skeleton from './skeleton'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 分类列表数据
      categoryListData: [],
      // 分类顶部菜单数据列表
      categoryListMenuData: [],

      bs: null,
      // 在获取索引的时候，要注意把字符转换成数字，是通过Attribute获取的属性值，因为是index进行比较的，
      activeIndex: 0,
      loading: true
    }
  },
  components: {
    'drop-menu': DropMenu,
    skeleton
  },
  created () {
    this.getCategoryListData()
    this.getCategoryMenuData(0)
  },
  mounted () {
  },
  methods: {
    ...mapMutations([
      'changeTabbarIndex'
    ]),
    async getCategoryListData () {
      const { data } = await this.$http.get('homeApi/categories')
      this.loading = false
      if (data.success) {
        this.categoryListData = data.data.cate
        this.$nextTick(() => {
          this.initBScroll()
          // 判断是否从首页那10个图标跳转过来的，等到渲染好了再处理
          this.cateFromhome()
        })
      }
    },
    /*
      参数：传入选中分类的索引，整数
    */
    async getCategoryMenuData (activeIndex) {
      activeIndex = (activeIndex + 1).toString().padStart(3, '0')
      // console.log(activeIndex)
      const { data } = await this.$http.get('homeApi/categoriesdetail/lk' + activeIndex)
      if (data.success) {
        this.categoryListMenuData = data.data.cate
      }
      // console.log(this.categoryListMenuData)
    },
    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.cate-wrapper', {
          probeType: 2,
          click: true,
          scrollX: false,
          scrollY: true
          // eventPassthrough: 'vertical'
        })
      } else {
        this.bs.reflash()
      }
    },

    clickDetailCate (e) {
      var targetDom = e.target
      // 注意这里的index获取的字符串，要注意进行转换
      var index = targetDom.getAttribute('data-index')
      this.activeIndex = index - 0
      // console.log(this.activeIndex)
      this.cateMoveToTop()
      this.getCategoryMenuData(this.activeIndex)
    },
    /*
      功能：把选中的分类，移动到最顶部
    */
    cateMoveToTop () {
      var el = this.$refs.cateContentRef.children[this.activeIndex]
      // 单位是ms
      var time = 1000
      this.bs.scrollToElement(el, time)
    },

    /*
      功能：判段路由是否带了参数，如果带是，说明他是从首页的分类图标（那10个图标）点击，从而在设置一下索引就可以
      注意：因为它要跟异步获取的数据进行比较，所以需要等到数据回来的时候，才能对比，所以只能放在获取数据的函数里执行
      如果放在created或者其他地方，获得的数据是空的，因为是同步执行的
      参数不会出现url中的，在请求体中了
    */
    cateFromhome () {
      if (!this.$route.query.name) {
        return
      }
      var name = this.$route.query.name
      this.activeIndex = this.categoryListData.findIndex(function (item, index) {
        if (item.name === name) {
          return index
        }
      })
      // 通过vuex同步tabbar图标
      this.changeTabbarIndex(1)
      // 获取对应的索引之后，去触发点击事件就可以的，本来应该是li，结果被设置成 span
      // console.dir(this.$refs.cateContentRef.children[this.activeIndex].children[0])
      // 这句话为什么没有生效？？？
      // this.$refs.spanRef[this.activeIndex].click()
      // console.log(this.$refs.spanRef[this.activeIndex])
      this.cateMoveToTop()
      this.getCategoryMenuData(this.activeIndex)
    },
    onFocusSearch () {
      this.$toast(this.$t('common.unrealized'))
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    /* 左侧选中的分类 */
    /* 激活的分类选项 */
    .activeCate {
      background-color: #fff;
      border-left: 4/@rootRem solid #3cb963;
      font-weight: bold;
    }
    .container {
      padding-top: 55/@rootRem;
    }
    .search {
        border-bottom: 1/@rootRem solid #e6e6e6;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }
    .left-scroll {
      width: 95/@rootRem;
      float: left;
    }
    .right-content {
      width: 100%;
      padding-left: 95/@rootRem;
      box-sizing: border-box;
    }
    /* 左侧分类滑动 */
    .cate-wrapper {
      height: 560/@rootRem;
      overflow: hidden;
      position: relative;
      .cate-content {
        background-color: #f4f4f4;
        position: absolute;
        li {
          border-bottom: 1/@rootRem solid #e8e9e8;
          span {
            width: 95/@rootRem;
            font-size: 16/@rootRem;
            padding: 12/@rootRem;
            display: block;
            box-sizing: border-box;
            color: #666;
          }
        }
      }
    }
</style>
