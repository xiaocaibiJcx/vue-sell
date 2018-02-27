<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h3 class="title">{{seller.name}}</h3>
        <div class="desc border-1px">
          <v-star :size="36" :score="seller.score" class="star"></v-star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h3>起送价</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h3>商家配送</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}元</span>
            </div>
          </li>
          <li class="block">
            <h3>平均配送时间</h3>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h3 class="title">公告与活动</h3>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h3 class="title">商家实景</h3>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h3 class="title border-1px">商家信息</h3>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .seller .overview {
    position: relative;
    padding: 18px;
  }

  .seller .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .overview .desc {
    position: relative;
    padding-bottom: 18px;
    font-size: 0;
  }

  .seller .overview .desc::after {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    content: "";
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .desc .star {
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
  }

  .seller .overview .desc .text {
    display: inline-block;
    margin-right: 12px;
    line-height: 18px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }

  .seller .overview .remark {
    display: flex;
    padding-top: 18px;
  }

  .seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .overview .remark .block:last-child {
    border: none;
  }

  .seller .overview .remark .block h3 {
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .seller .overview .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: rgb(7, 17, 27);
  }

  .seller .overview .remark .block .content .stress {
    font-size: 12px;
  }
  .seller .overview .favorite {
    position: absolute;
    width: 50px;
    right: 11px;
    top: 18px;
    text-align: center;
  }
  .seller .overview .favorite .icon-favorite {
    display: block;
    margin-bottom: 4px;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9;
  }
  .seller .overview .favorite .icon-favorite.active {
    color: rgb(240, 20, 20);
  }
  .seller .overview .favorite .text {
    line-height: 10px;
    font-size: 10px;
    color: rgb(77, 85, 93);
  }
  .seller .bulletin {
    padding: 18px 18px 0 18px;
  }

  .seller .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .bulletin .content-wrapper {
    position: relative;
    padding: 0 12px 16px 12px;
  }

  .seller .bulletin .content-wrapper::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: '';
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: rgb(240, 20, 20);
  }

  .seller .bulletin .supports .support-item {
    position: relative;
    padding: 16px 12px;
    font-size: 0;
  }

  .seller .bulletin .supports .support-item::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: "";
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .bulletin .supports .support-item:last-child::after {
    border: 0;
  }

  .seller .bulletin .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .seller .bulletin .supports .support-item .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }

  .seller .pics {
    padding: 18px;
  }

  .seller .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    font-size: 14px;
  }

  .seller .pics .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .seller .pics .pic-wrapper .pic-list {
    font-size: 0;
  }

  .seller .pics .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }

  .seller .pics .pic-wrapper .pic-list .pic-item:last-child {
    margin: 0;
  }

  .seller .info {
    padding: 18px 18px 0 18px;
    color: rgb(7, 17, 27);
  }

  .seller .info .title {
    position: relative;
    padding-bottom: 12px;
    line-height: 14px;
  }

  .seller .info .title::after {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    content: "";
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .info .info-item {
    position: relative;
    padding: 16px 12px;
    line-height: 16px;
    font-size: 12px;
  }

  .seller .info .info-item::after {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    content: "";
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .seller .info .info-item::after:last-child {
    border: none;
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  import star from '../star/star';
  import split from '../split/split';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee'];
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(e) {
        console.log(this.favorite);
        if (!e._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      'v-star': star,
      'v-split': split
    }
  };
</script>
