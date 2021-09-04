<template>
    <div class="my-vip">
        <!-- 开通vip区域 -->
        <div class="open-vip">
            <van-nav-bar :title="$t('mine.greenCard')" left-arrow @click-left="$router.back()"/>
            <img src="../../../assets/images/mine/vip.png" alt="">
            <div class="vip-privilege">
                <!-- <p>绿卡特权</p> -->
                <p>{{ $t('mine.greenCardPower') }}</p> 
                <ul>
                    <li>
                        <van-icon name="vip-card-o" size="0.8rem" />
                        <!-- <span>专享券</span> -->
                        <span>{{ $t('mine.cardTip1') }}</span>
                    </li>
                    <li>
                        <van-icon name="discount" size="0.8rem"/>
                        <!-- <span>专享特价</span> -->
                        <span>{{ $t('mine.cardTip2') }}</span>
                    </li>
                    <li>
                        <van-icon name="gem-o" size="0.8rem"/>
                        <!-- <span>2倍积分</span> -->
                        <span>{{ $t('mine.cardTip3') }}</span>
                    </li>
                    <li>
                        <van-icon name="more-o" size="0.8rem"/>
                        <!-- <span>更多特权</span> -->
                        <span>{{ $t('mine.cardTip4') }}</span>
                    </li>
                </ul>
            </div>
            <van-button class="vip-button" round color="#303747"
            @click="vipPay">{{ $t('mine.fiftypecert') }}</van-button>
        </div>
        <!-- vip优惠券区域 -->
        <div class="vip-coupon">
            <div class="title">
                <span>1</span>
                <!-- <span>绿卡专享券 天天领优惠</span> -->
                <span>{{ $t('mine.cardRecoamnd') }}</span>
            </div>
            <div class="today">
                <!-- <span>今日专享券</span> -->
                <span>{{ $t('mine.TodayExclusivecoupon') }}</span>
                <span>{{ today_ticket.notice }}</span>
                <ul class="coupon">
                    <li v-for="(item) in today_ticket.tickets" :key="item.id">
                        <div class="content">
                            <p>￥<span>{{ item.money }}</span></p>
                            <p>{{ $t('mine.to') }}{{ item.pay_min }}{{ $t('mine.toUse') }}</p>
                            <p>{{ item.description }}</p>
                        </div>
                        <!-- <div class="receive"><i>立即领取</i></div> -->
                        <div class="receive"><i>{{ $t('mine.immeatallyGet') }}</i></div>
                    </li>
                </ul>

            </div>
            <div class="week">
                <!-- <span>本周专享券</span> -->
                <span>{{ $t('mine.weekBill') }}</span>
                <span>{{ week_ticket.notice }}</span>
                <ul class="coupon">
                    <li v-for="(item) in week_ticket.tickets" :key="item.id">
                        <div class="content">
                            <p>￥<span>{{ item.money }}</span></p>
                            <p>{{ $t('mine.to') }}{{ item.pay_min }}{{ $t('mine.toUse') }}</p>
                            <p>{{ item.description }}</p>
                        </div>
                        <div class="receive"><i>{{ $t('mine.immeatallyGet') }}</i></div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- vip积分加速 -->
        <div class="vip-speed-up">
            <div class="title">
                <span>2</span>
                <!-- <span>绿卡专享券 天天领优惠</span> -->
                <span>{{ $t('mine.billTip') }}</span>
            </div>
            <div class="content-box">
                <div class="content">
                    <div class="jifen">
                        <!-- <p>您当前购物</p> -->
                        <p>{{ $t('mine.currentGoods') }}</p>
                        <p>{{ $t('mine.cardBack') }}
                            <span>{{ $t('mine.onece') }}</span>
                        </p>
                    </div>
                </div>
                <div class="content right-content">
                    <div class="jifen right-jifen">
                        <!-- <p>开通绿卡购物</p> -->
                        <p>{{ $t('mine.cardShop') }}</p>
                        <p>{{ $t('mine.cardBack') }}
                            <span>{{ $t('mine.twice') }}</span>
                        </p>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="rocket">
                <img src="../../../assets/images/mine/rockets.png" alt="">
            </div>
            <!-- 积分加速 -->
            <van-button class="vip-button open-jifen" round color="#303747"
            @click="vipPay">{{ $t('mine.cardSpecialTip') }}</van-button>
        </div>
        <!-- vip特价产品 -->
        <div class="vip-product">
            <div class="title">
                <span>3</span>
                <!-- <span>绿卡专享特价</span> -->
                <span>{{ $t('mine.cardSpecial') }}</span>
            </div>
            <!-- 滑动商品 -->
            <!-- 注意这里要使用vant中的粘性布局，
            自己使用fixed去布局，会导致滑动出问题，暂时无解 -->
            <van-sticky :offset-top="45">
            <!-- <div class="top-fixed"> -->
            <div class="product-swiper">
                <ul class="pro-wrapper" ref="ulWrapperRef">
                    <li v-for="(item, index) in vipProData" :key="item.id" ref="liRef"
                    :class="{ activePro: activeIndex === index }"
                    @click="clickProItem(index)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <!-- </div> -->
            </van-sticky>
            <!-- 商品详情 -->
            <div class="pro-detail">
                <ul>
                    <li v-for="item in pro_detail" :key="item.id">
                        <!-- 左边 -->
                        <div class="left">
                            <img :src="item.small_image" alt="">
                        </div>
                        <!-- 右边 -->
                        <div class="right">
                            <!-- 信息 -->
                            <div class="info">
                                <p>{{ item.product_name }}</p>
                                <p>{{ item.spec }}</p>
                            </div>
                            <!-- 价格 -->
                            <div class="price">
                                <p>￥{{ item.origin_price }}</p>
                                <p>￥{{ item.price }}</p>
                                <!-- van-button渲染出来后第二个样式会有点问题，暂时不知道为什么会这样，样式都一样，就这个有问题 -->
                                <!-- <van-button icon="hot-o" type="primary" size="mini" plain
                                @click="vipPay">
                                {{ $t('mine.openCard') }}
                                </van-button> -->
                                <div class="openCardButton">
                                    <!-- 加了span是为给边框，行内块元素去撑开 -->
                                    <span class="content" @click="vipPay">
                                        <van-icon name="hot-o" color="#3cb963" size="0.5rem"/>
                                        <span>{{ $t('mine.openCard') }}</span>                                    
                                    </span>
                                </div>
                            </div>
                            <!-- 购物车 -->
                            <van-icon class="shop-car" name="cart-circle" color="#ccc"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 开通年卡按钮 -->
        <div class="open-year-vip" v-if="vip_cards.length !== 0" v-show="showCards">
            <div class="left">
                <!-- <span>年卡</span> -->
                <span>{{ $t('mine.yearCard') }}</span>
                <span>{{ vip_cards[1].price }}{{ $t('coupon.yuan') }}</span>
                <span>{{ vip_cards[1].origin_price }}{{ $t('coupon.yuan') }}</span>
            </div>
            <div class="right" @click="vipPay">
                {{ $t('mine.openCards') }}
            </div>
        </div>
        <!-- 更多商品 -->
        <div class="more">
            <!-- 更多特权敬请期待~~~ -->
            {{ $t('mine.moreMessage') }}
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      today_ticket: [],
      week_ticket: [],
      activeIndex: 0,
      vipProData: [],
      bs: null,
      pro_detail: [],
      // 季卡，年卡数据
      vip_cards: [],
      showCards: false,
      // 当前滚动的距离
      currentScrollDistance: 0,
      // 滚动出去距离显示
      targetCardsDistance: 400

    }
  },
  mounted () {
    // scroll事件会冒泡
    window.addEventListener('scroll', this.handleScrollTop)
  },
  created () {
    this.getVipData()
  },
  methods: {
    async getVipData () {
      const { data } = await this.$http.get('vip')
      if (!data.success) {
        console.log('获取vip数据失败')
        return -1
      }
      this.today_ticket = data.data.today_ticket
      this.week_ticket = data.data.week_ticket
      this.vipProData = data.data.cate
      this.pro_detail = data.data.cate_detail
      this.vip_cards = data.data.cards
      // console.log(this.week_ticket)
      this.$nextTick(() => {
        var liCount = this.$refs.ulWrapperRef.children.length
        if (liCount <= 0) {
          return
        }
        var totalWidth = 0
        for (var i = 0; i < liCount; i++) {
          totalWidth += (this.$refs.liRef[i].offsetWidth + 1)
        }
        this.$refs.ulWrapperRef.style.width = totalWidth + 'px'
        this.initBScroll()
      })
    },
    initBScroll () {
      if (!this.bs) {
        this.bs = new BScroll('.product-swiper', {
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
    clickProItem (index) {
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

    // 获取window滚动出去的距离
    handleScrollTop () {
      this.currentScrollDistance = document.documentElement.scrollTop || document.body.scrollTop
      if (this.currentScrollDistance >= this.targetCardsDistance) {
        this.showCards = true
      } else {
        this.showCards = false
      }
    },

    /* vip开通 */
    vipPay () {
      this.$router.push('/mine/vippay')
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem: 37.5rem;
    .vip-button {
        width: 60%;
        color: #5fa85f!important;
        position: relative;
        left: 50%;
        transform: translate(-50%);
        margin: 10/@rootRem 0;
    }
    .title {
        span {
            &:first-of-type {
                color: #fff;
                background-color: #60b86a;
                width: 20/@rootRem;
                height: 20/@rootRem;
                line-height: 20/@rootRem;
                text-align: center;
                display: inline-block;
                font-size: 16/@rootRem;
            }
            &:last-of-type {
                font-weight: bold;
                font-size: 16/@rootRem;
                margin-left: 10/@rootRem;
            }
        }
    }
    .my-vip {
        background-color: #f5f5f5;
    }
    .open-vip {
        padding-top: 45/@rootRem;
        background-color: #fff;
        /* 导航栏背景颜色 */
        .van-nav-bar {
            position: fixed;
            width: 100%;
            top: 0;
            background-color: #303747;
            /deep/.van-nav-bar__title {
                color: #fff;
            }
            /* 小箭头颜色 */
            /deep/.van-icon {
                color: #fff;
            }
        }
        img {
            width: 100%;
        }
        .vip-privilege {
            p {
                font-size: 16/@rootRem;
                font-weight: bold;
                padding: 15/@rootRem;
            }
            ul {
                display: flex;
                li {
                    width: 25%;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    span {
                        color: #7d7e80;
                        font-size: 12/@rootRem;
                    }
                }
            }
        }
    }
    /* vip优惠券样式 */
    .vip-coupon {
        padding: 15/@rootRem;
        background-color: #fff;
        margin-top: 20/@rootRem;
        .today,
        .week {
            span {
                font-size: 12/@rootRem;
                &:last-of-type {
                    color: #808080;
                    margin-left: 5/@rootRem;
                }
            }
        }
        /* 优惠券详情 */
        .coupon {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                width: 47%;
                border: 1/@rootRem solid #60B86A;
                border-left: 2/@rootRem dashed #60B86A;
                color: #60b86a;
                font-size: 12/@rootRem;
                display: flex;
                justify-content: space-between;
                padding-left: 5/@rootRem;
                box-sizing: border-box;
                margin-top: 10/@rootRem;
                .content {
                    width: 120/@rootRem;
                    span {
                        font-size: 30/@rootRem;
                        margin: 0;
                        color: #60b86a;
                    }
                    p {
                        &:nth-of-type(2) {
                            color: #808080;
                        }
                        // 让汉字不换行的使用的是这个，word-break是用于英文单词的
                        width: 100%;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                .receive {
                    background-color: #60b86a;
                    display: flex;
                    align-items: center;
                    width: 30/@rootRem;
                    // 确保里边的元素居中
                    i {
                        // 有手机浏览器这个样式兼容不了
                        // writing-mode: vertical-lr;
                        color: #fff;
                        padding: 5/@rootRem;
                        font-style: normal;
                        text-align: center;
                        word-break: break-word;
                    }
                }
            }
        }
    }
    /* vip优惠券样式 */
    /* vip加速样式 */
    .vip-speed-up {
        margin: 20/@rootRem 0;
        padding: 15/@rootRem;
        background-color: #fff;
        position: relative;
        .content-box {
            position: relative;
            height: 60/@rootRem;
            margin: 10/@rootRem 0;
        }
        .content {
            width: 35%;
            margin: 10/@rootRem 0;
            height: 0;
            border-top: 60/@rootRem solid #dbdbdb;
            border-right: 80/@rootRem solid transparent;
            border-top-left-radius: 15/@rootRem;
            position: absolute;
            .jifen {
                min-width: 80/@rootRem;
                position: absolute;
                top: -55/@rootRem;
                left: 10/@rootRem;
                p {
                    font-size: 12/@rootRem;
                    span {
                        font-size: 18/@rootRem;
                    }
                }
            }
        }
        .right-content {
            border-top: 60/@rootRem solid #6bbe66;
            transform: rotateZ(-180deg);
            right: 0/@rootRem;
        }
        .right-jifen {
            min-width: 125/@rootRem!important;
            transform: rotateZ(-180deg);
            bottom: 5/@rootRem!important;
            left: 5/@rootRem!important;
        }
        .line {
            width: 75%;
            height: 10/@rootRem;
            margin: 0 auto;
            background: linear-gradient(270deg,yellow,#7affaf);
            border-radius: 10/@rootRem;
            position: relative;
            bottom: -55/@rootRem;
        }
        // 小火箭的位置
        .rocket {
            width: 50/@rootRem;
            height: 50/@rootRem;
            position: absolute;
            z-index: 1;
            right: 0;
            top: 50/@rootRem;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    /* vip加速样式 */
    /* vip特价产品 */
    .vip-product {
        background-color: #fff;
        padding: 15/@rootRem;
        .product-swiper {
            overflow: hidden;
            background-color: #fff;
            border-bottom: 1/@rootRem solid #93999f;
            .pro-wrapper {
              display: inline-block;
              padding: 15/@rootRem 0;
              li {
                  float: left;
                  font-size: 14/@rootRem;
                  /* 相邻选择器，选一个 */
                  &+li {
                      padding-left: 30/@rootRem;
                  }
              }
            }
        }
    }
    /* 商品详情*/
    .pro-detail {
        li {
            display: flex;
            padding-bottom: 20/@rootRem;
            padding-top: 5/@rootRem;
            border-top: 1/@rootRem solid #dbdbdb;
            position: relative;
            .left {
                width: 70/@rootRem;
                height: 70/@rootRem;
                flex-shrink: 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .right {
                margin-left: 5/@rootRem;
                position: relative;
                .info {
                    p {
                        &:first-of-type {
                            font-size: 16/@rootRem;
                        }
                        &:last-of-type {
                            font-size: 12/@rootRem;
                            color: #93999f;
                        }
                    }
                }
                .price {
                    p {
                        &:first-of-type {
                            font-size: 12/@rootRem;
                            color: #93999f;
                            text-decoration: line-through;
                        }
                        &:last-of-type {
                            font-size: 14/@rootRem;
                            color: #5fa85f;
                        }
                    }
                    /* 开通按钮 */
                    .openCardButton {
                        width: 200/@rootRem;
                        position: absolute;
                        bottom: 0;
                        left: 60/@rootRem;
                        .content {
                            border: 1/@rootRem solid #3cb963;
                            padding: 0 3/@rootRem;
                            span {
                                height: 28/@rootRem;
                                line-height: 28/@rootRem;
                                font-size: 12/@rootRem;
                                color: green;
                                display: inline-block;
                                vertical-align: top;
                            }
                        }
                    }
                }
            }
            /* 左边是对齐的，右边是对不齐的，所有用左边作为基准 */
            .shop-car {
                position: absolute;
                bottom: 0;
                left: 250/@rootRem;
            }
        }
    }
    .activePro {
      color: #3cb963;
    }
    /* vip特价产品 */

    /* 开通按钮样式 */
    .open-year-vip {
        border-radius: 20/@rootRem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45/@rootRem;
        overflow: hidden;
        position: fixed;
        bottom: 10/@rootRem;
        width: 90%;
        left: 0;
        right: 0;
        margin: 0 auto;
        .left {
            width: 75%;
            height: 100%;
            line-height: 45/@rootRem;
            background-color: #303747;
            padding-left:20/@rootRem;
            box-sizing: border-box;
            span {
                font-size: 16/@rootRem;
                color: #fff;
                &:nth-of-type(2) {
                    font-size: 14/@rootRem;
                    color: #f2525a;
                    padding: 0 10/@rootRem;
                }
                &:last-of-type {
                    text-decoration: line-through;
                }
            }
        }
        .right {
            width: 25%;
            height: 100%;
            box-sizing: border-box;
            text-align: center;
            line-height: 45/@rootRem;
            background-color: #3cb963;
            color: #fff;
            font-size: 16/@rootRem;
        }
    }

    /* 开通按钮样式 */
    .more {
        font-size: 16/@rootRem;
        text-align: center;
        color: #93999f;
        padding: 20/@rootRem;
    }
    /* top-fixed */
    .top-fixed {
        position: fixed;
        top: 45/@rootRem;
        z-index: 99;
        left: 0;
    }
</style>
