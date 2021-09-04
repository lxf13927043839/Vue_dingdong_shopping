<template>
    <div class="back-to-top" @click="ClickBackToTop">
        <transition>
            <img v-show="showRocketFlag" src="../../assets/images/home/rocket.png" alt="">
        </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 当前滚动的距离
      currentScrollDistance: 0,
      // 滚动出去距离显示小火箭
      targetDistance: 300,
      // true 显示小火箭
      showRocketFlag: false,
      // 定时器标志位，预防多次点击，速度加快
      timeId: 0,
      // 返回的速度
      backSpeed: -70,
      // 定时器的时间，越小，返回顶部越快，毫秒单位
      minSecond: 5
    }
  },
  created () {
  },
  mounted () {
    // scroll事件会冒泡
    window.addEventListener('scroll', this.handleScrollTop)
    // 在其他页面有滚动，需要重置一下
    document.documentElement.scrollTop = document.body.scrollTop = 0
  },
  methods: {
    /*
        作用：获取滚动出去的距离
    */
    handleScrollTop () {
      this.currentScrollDistance = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(this.currentScrollDistance)
      if (this.currentScrollDistance >= this.targetDistance) {
        this.showRocketFlag = true
      } else {
        this.showRocketFlag = false
      }
    },

    /*
        作用：点击返回顶部
    */
    ClickBackToTop () {
      // 防止重复点击，速度加快
      if (this.timeId) {
        clearInterval(this.timeId)
        this.timeId = null
      }
      this.timeId = setInterval(() => {
        document.documentElement.scrollTop = document.body.scrollTop = this.currentScrollDistance + this.backSpeed
        if (this.currentScrollDistance <= 0) {
          clearInterval(this.timeId)
          this.timeId = null
        }
      }, this.minSecond)
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .back-to-top {
        width: 30/@rootRem;
        position: fixed;
        bottom: 80/@rootRem;
        right: 20/@rootRem;
        z-index: 999;
        img {
            width: 100%;
            height: 100%;
        }
    }
    /* transotion的对象是img，不是box,不能使用right，别混了 */
    .v-enter,
    .v-leave-to {
        opacity: 0;
        transform: translate(100/@rootRem);
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 1s linear;
    }
    .v-enter-to,
    .v-leave {
        opacity: 1;
    }
</style>
