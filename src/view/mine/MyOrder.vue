<template>
    <div class="my-order">
        <van-nav-bar :title="$t('mine.myOrders')" class="marginB10" left-arrow @click-left="$router.back()"/>
        <!-- tab标签页 -->
        <van-tabs v-model="activeTabIndex" title-active-color="rgb(40, 190, 87)" animated color="rgb(40, 190, 87)">
            <van-tab :title="$t('mine.itemsTitle[0]')">
                <div class="no-data">
                    <img src="../../assets/images/mine/noData.jpeg" alt="">
                    <!-- <span>暂时没有相关的订单</span> -->
                    <span>{{ $t('mine.feedbackTip') }}</span>
                </div>
            </van-tab>
            <van-tab :title="$t('mine.itemsTitle[1]')">
                <div class="no-data">
                    <img src="../../assets/images/mine/noData.jpeg" alt="">
                    <!-- <span>暂时没有相关的订单</span> -->
                    <span>{{ $t('mine.feedbackTip') }}</span>
                </div>
            </van-tab>
            <van-tab :title="$t('mine.itemsTitle[2]')">
                <div class="no-data">
                    <img src="../../assets/images/mine/noData.jpeg" alt="">
                    <!-- <span>暂时没有相关的订单</span> -->
                    <span>{{ $t('mine.feedbackTip') }}</span>
                </div>
            </van-tab>
            <van-tab :title="$t('mine.itemsTitle[3]')">
                <div class="no-data">
                    <img src="../../assets/images/mine/noData.jpeg" alt="">
                    <!-- <span>暂时没有相关的订单</span> -->
                    <span>{{ $t('mine.feedbackTip') }}</span>
                </div>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabIndex: 0
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .my-order{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #f5f5f5;
        .no-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
              width: 60%;
              height: 60%;
          }
          span {
              font-size: 12/@rootRem;
              color: #808080;
          }
        }
        /* 小箭头颜色 */
        /deep/.van-icon {
            color:rgb(40, 190, 87);
        }
    }
    .marginB10 {
        margin-bottom: 10/@rootRem;
    }

</style>
