<template>
    <div>
        <waterfall :col='2' :data="foodListData">
            <template>
                <div class="food-item" v-for="item in foodListData" :key="item.id">
                    <div class="food-img">
                        <img v-lazy="item.image" alt="">
                    </div>
                    <p class="food-name">{{ item.name }}</p>
                    <div class="author">
                        <img v-lazy="item.author_avatar" alt="">
                        <span class="name">{{ item.author_name }}</span>
                    </div>
                </div>
            </template>
        </waterfall>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  watch: {
    // 监测数据的变化，但是还没有更新到dom身上去，所以要用nextTick
    foodListData: function () {
      this.$nextTick(() => {
        this.$waterfall.forceUpdate()
      })
    }
  },
  props: {
    foodListData: Array
  },
}
</script>

<style lang="less" scoped>
/* waterfall在属性中已经分成50% */
    @rootRem: 37.5rem;
    .food-item {
        margin: 5/@rootRem;
        box-sizing: border-box;
        background-color: #f5f5f5;
        border-radius: 10/@rootRem;
        overflow: hidden;
        .food-img {
            /* 懒加载图片样式 */
            img[lazy="loading"],
            img {
                width: 100%;
            }
        }
        .food-name {
            font-size: 17/@rootRem;
            font-weight: bold;
            padding-left: 10/@rootRem;
        }
        .author {
            padding: 10/@rootRem;
            display: flex;
            align-items: center;
            /* 懒加载图片样式 */
            img[lazy="loading"],
            img {
                height: 35/@rootRem;
                width: 35/@rootRem;
                border-radius: 50%;
                margin-right: 15/@rootRem;
            }
            .name {
                font-size: 13/@rootRem;
                color: #999;
            }
        }
    }
</style>
