<!--
*   购物车的组件，显示用户添加到购物车中的商品
    主要操作vuex数据
    在home页面挂起的时候就会去，读取sessionStroage中的数据了，所以这里不用操作了
*
-->
<template>
    <div class="showProduct">
        <!-- 商品区域 -->
        <div class="product">
        <!-- 整个购物车商品用复选框组包括 -->
        <van-checkbox-group v-model="checkboxResult" ref="checkboxGroup">
        <ul ref="ulRef">
            <!-- 要注意删除一个商品后，index会不会变化，出现问题 -->
            <li v-for="(item, index) in selectProduct" :key="item.id">
                <van-checkbox :name="index" checked-color="#45c763" @click="checkProduct(item.id)"></van-checkbox>
                <div class="left">
                    <img v-lazy="item.small_image" alt="">
                </div>
                <div class="right">
                    <p>{{ item.product_name }}</p>
                    <div class="price">
                        <span>￥{{ item.price }}</span>
                        <div class="num">
                            <div class="operate" @click="decreatePro(item)">-</div>
                            <div class="showNum" @click="userInputClick(item.id)">{{ item.num }}</div>
                            <div class="operate" @click="createPro(item)">+</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        </van-checkbox-group>
        <!-- 用户输入数量对话框，注意input输入框得到的字符串，要转成数值，统一处理 -->
        <van-dialog v-model="showInput" class="user-input"
        theme="round-button" show-cancel-button
        @confirm="userInputConfirm">
            <div class="tip">{{ $t('car.inputNum') }}:</div>
            <input type="number" v-model="userInputNumber">
        </van-dialog>
        </div>
        <!-- 结算区域 -->
        <div class="summary">
            <van-submit-bar :price="totalPay" :button-text="$t('order.settlement')" @submit="onSubmit"
            :disabled="totalPay == 0?true:false">
                <van-checkbox v-model="checkedAll" @click="checkAllClick">{{ $t('car.all') }}</van-checkbox>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { findIndexFromList } from '../../assets/js/shopCar.js'
export default {
  data () {
    return {
      checkedAll: false,
      // 选中的复选框
      checkboxResult: [],
      showInput: false,
      userInputNumber: 1,
      changeNumId: 0
    }
  },
  created () {
    this._initCheckboxResult()
  },
  computed: {
    ...mapState([
      'selectProduct'
    ]),
    ...mapGetters([
      'totalPay'
    ])
  },
  methods: {
    ...mapMutations([
      'createProduct',
      'decreateProduct',
      'deleteProduct',
      'updateProduct',
      'setCheckProduct',
      'setCheckAllProduct',
      'cancelCheckAllProduct'
    ]),
    onSubmit () {
      this.$router.push('/settlement')
    },
    /*
        减少商品,减1
    */
    decreatePro (item) {
      var index = findIndexFromList(this.selectProduct, item.id)
      // console.log(index)
      // 判断当前是不是只剩下一个了
      if (item.num === 1) {
        this.$dialog.confirm({
          title: this.$t('common.tipTile'),
          message: this.$t('common.deleteConfirm')
        })
          .then(() => {
            // on confirm---确认的情况
            this.deleteProduct(index)
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.decreateProduct(index)
      }
    },
    /*
        增加商品，加1
    */
    createPro (item) {
      var index = findIndexFromList(this.selectProduct, item.id)
      this.createProduct(index)
      // console.log(index)
    },

    /*
      对话框用户确认输入数量，需要验证下
    */
    userInputConfirm () {
      // console.log(typeof (this.userInputNumber - 0))
      if (this.userInputNumber <= 0) {
        this.userInputNumber = 1
        this.$toast(this.$t('car.invalidNum'))
      } else {
        this.updateProduct({
          index: findIndexFromList(this.selectProduct, this.changeNumId),
          num: this.userInputNumber - 0
        })
        // 复原一下
        this.userInputNumber = 1
      }
    },
    /*
      用户点击修改数量的时候，获取要修改的索引
    */
    userInputClick (id) {
      this.changeNumId = id
      this.showInput = true
    },

    /*
      选择复选框
    */
    checkProduct (id) {
      // console.log(this.checkboxResult)
      var index = findIndexFromList(this.selectProduct, id)
      this.setCheckProduct(index)
      // 通过复选框组的数组看是否全选了
      if (this.checkboxResult.length === this.$refs.ulRef.children.length) {
        // console.log('全选')
        this.checkedAll = true
        this.setCheckAllProduct()
      } else {
        // 如果没有全选是不需进行处理的，它会取反
        this.checkedAll = false
      }
    },
    /*
      全选复选框
    */
    checkAllClick () {
      if (this.checkedAll) {
        this.$refs.checkboxGroup.toggleAll(true)
        this.setCheckAllProduct()
      } else {
        this.$refs.checkboxGroup.toggleAll()
        this.cancelCheckAllProduct()
      }
    },
    /*
      初始化复选框的选中情况
    */
    _initCheckboxResult () {
      this.selectProduct.forEach((item, index) => {
        if (item.checked) {
          this.checkboxResult.push(index)
        }
      })
      if (this.checkboxResult.length === this.selectProduct.length) {
        this.checkedAll = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
    @rootRem:37.5rem;
    .summary {
        .van-submit-bar {
            bottom: 50/@rootRem;
        }
    }
    /* 商品样式 */
    .product {
        ul {
            li {
                background-color: #fff;
                display: flex;
                align-items: center;
                padding: 0 10/@rootRem;
                margin-top: 15/@rootRem;
                .left {
                    width: 110/@rootRem;
                    height: 110/@rootRem;
                    /* 懒加载图片样式 */
                    img[lazy="loading"],
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    padding: 10/@rootRem;
                    p {
                        font-size: 16/@rootRem;
                    }
                    .price {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 20/@rootRem;
                        position: relative;
                        span {
                            font-size: 16/@rootRem;
                        }
                        .num {
                            font-size: 18/@rootRem;
                            display: flex;
                            align-items: center;
                            position: absolute;
                            left: 130/@rootRem;
                            .operate {
                                background-color: rgb(111, 235, 140);
                                border-radius: 50%;
                                width: 15/@rootRem;
                                height: 15/@rootRem;
                                line-height: 15/@rootRem;
                                text-align: center;
                                color: #fff;
                            }
                            .showNum {
                              width: 40/@rootRem;
                              height: 24/@rootRem;
                              line-height: 24/@rootRem;
                              text-align: center;
                              margin: 0 5/@rootRem;
                              background-color: #f5f5f5;
                            }
                        }
                    }
                }
            }
        }
    }
    /* 商品样式 */
    /* 输入数量 */
    .user-input {
        .tip {
          font-weight: bold;
          font-size: 18/@rootRem;
          padding: 15/@rootRem;
        }
        input {
          border: none;
          margin-left: 15/@rootRem;
          border-bottom: 1/@rootRem solid rgb(90, 228, 182);
        }
    }
    /* 输入数量 */
</style>
