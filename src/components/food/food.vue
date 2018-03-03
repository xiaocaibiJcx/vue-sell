<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image"/>
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h3 class="title">{{food.name}}</h3>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst">
              加入购物车
            </div>
          </transition>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h3 class="header">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split></v-split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <v-ratingselect @select="selectRaing" @toggle="toggleContent" :selectType="selectType"
                          :onlyContent="onlyContent" :desc="desc"
                          :ratings="food.ratings"></v-ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class=text>
                  <span
                    :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1} "></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
  }

  .move-enter-active, .move-leave-active {
    transition: all .2s linear;
  }

  .move-enter, .move-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .food .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .food .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .food .image-header .back {
    position: absolute;
    top: 10px;
    left: 0;
  }

  .food .image-header .back .icon-arrow_lift {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  .food .content {
    position: relative;
    padding: 18px;
  }

  .food .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .food .content .detail {
    margin-bottom: 18px;
    height: 10px;
    line-height: 10px;
    font-size: 0px;
  }

  .food .content .detail .sell-count {
    margin-right: 12px;
  }

  .food .content .detail .sell-count,
  .food .content .detail .rating {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .content .price {
    font-size: 0px;
    line-height: 24px;
  }

  .food .content .price .now {
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }

  .food .content .price .old {
    margin-left: 5px;
    text-decoration: line-through;
    font-size: 10px;
    font-weight: 700;
    color: rgb(147, 153, 159);
  }

  .food .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }

  .food .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0px 12px;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 10px;
    color: #fff;
    background: rgb(0, 160, 220);
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.1s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    z-index: -1;
  }

  .food .info {
    padding: 16px;
  }

  .food .info .header {
    line-height: 14px;
    font-size: 14px;
    color: #000;
    margin-bottom: 6px;
  }

  .food .info .text {
    padding: 0 8px;
    line-height: 24px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(77, 85, 93);
  }

  .food .rating {
    padding-top: 18px;
  }

  .food .rating .title {
    line-height: 14px;
    font-size: 14px;
    color: #000;
    margin-left: 18px;
  }

  .food .rating .rating-wrapper {
    padding: 0 18px;
  }

  .food .rating .rating-wrapper .rating-item {
    position: relative;
    padding: 16px 0px;
  }

  .food .rating .rating-wrapper .rating-item::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .food .rating .rating-wrapper .rating-item .user {
    position: absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0px;
  }

  .food .rating .rating-wrapper .rating-item .user .name {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .rating .rating-wrapper .rating-item .user .avatar {
    border-radius: 50%;
  }

  .food .rating .rating-wrapper .rating-item .time {
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food .rating .rating-wrapper .rating-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .food .rating .rating-wrapper .rating-item .text .icon-thumb_up,
  .food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
    margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
  }

  .food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
    color: rgb(0, 160, 220);
  }

  .food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
    color: rgb(147, 153, 159);
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFood(target) {
        this.$emit('add', target);
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRaing(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-ratingselect': ratingselect,
      'v-split': split
    }
  };
</script>
