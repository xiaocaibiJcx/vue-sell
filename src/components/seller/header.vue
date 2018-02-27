<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped>
  #header {
    color: #fff;
    position: relative;
    background: rgba(7, 17, 27, .5);
    overflow: hidden;
  }

  #header .content-wrapper {
    font-size: 0px;
    padding: 24px 12px 18px 24px;
    position: relative;
  }

  #header .content-wrapper .avatar img {
    border-radius: 2px;
  }

  #header .content-wrapper .avatar,
  #header .content-wrapper .content {
    display: inline-block;
    font-size: 14px;
  }

  #header .content-wrapper .content {
    margin-left: 14px;
    vertical-align: top;
  }

  #header .content-wrapper .content .title {
    margin: 2px 0 8px 0;
    font-size: 0px;
  }

  #header .content-wrapper .content .title .brand {
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
  }

  #header .content-wrapper .content .title .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  #header .content-wrapper .content .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }

  #header .content-wrapper .content .support .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  #header .content-wrapper .content .support .text {
    line-height: 12px;
    font-size: 10px;
    vertical-align: top;
  }

  #header .content-wrapper .support-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, .2);
    text-align: center;
  }

  #header .content-wrapper .support-count .count {
    font-size: 10px;
  }

  #header .content-wrapper .support-count .icon-keyboard_arrow_right {
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }

  #header .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, .2);
  }

  #header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 9px;
    width: 22px;
    height: 12px;
    background-size: 22px 12px;
  }

  #header .bulletin-wrapper .bulletin-text {
    margin: 0 4px;
    font-size: 10px;
  }

  #header .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    right: 12px;
    bottom: 8px;
    font-size: 10px;
  }

  #header .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  #header .detail {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, .8);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
  #header .detail .detail-wrapper {
    min-height: 100%;
    width: 100%;
  }

  #header .detail .detail-wrapper .detail-main {
    margin-top: 64px;
    padding-bottom: 64px;
  }

  #header .detail .detail-wrapper .detail-main .name {
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  #header .detail .detail-wrapper .detail-main .star-wrapper {
    height: 24px;
    line-height: 24px;
    margin-top: 16px;
    padding: 2px 0px;
    text-align: center;
  }
  #header .detail .detail-wrapper .detail-main .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
  }
  #header .detail .detail-wrapper .detail-main .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255,255,255,.2);
  }
  #header .detail .detail-wrapper .detail-main .title .text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  /*商家优惠*/
  #header .detail .detail-wrapper .detail-main .supports {
    width: 80%;
    margin: 0 auto;
  }
  #header .detail .detail-wrapper .detail-main .supports .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  #header .detail .detail-wrapper .detail-main .supports .support-item:last-child {
    margin-bottom: 0;
  }
  #header .detail .detail-wrapper .detail-main .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  #header .detail .detail-wrapper .detail-main .supports .support-item .text {
    line-height: 16px;
    font-size: 12px;
  }
  /*商家介绍*/
  #header .detail .detail-wrapper .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
  }
  #header .detail .detail-wrapper .detail-main .bulletin .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
  #header .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }

</style>
<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee'];
  },
  components: {
    star
  }
  };
</script>
