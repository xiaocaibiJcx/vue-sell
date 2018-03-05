<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="memu-item" ref="menuList" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
            <span class="text  border-1px">
              <span v-show="item.type>0" class="icon icongoods" :class="classMap[item.type]"></span>{{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li @click="selectFood(food,$event)" v-for="(item,index) in goods" class="foods-list" ref="foodList">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click.stop.prevent="selectFood(food,$event)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>

                <p class="desc">{{food.description}}</p>

                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol @add="addFood" :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"></v-shopcart>
    <v-food @add="addFood" :food="selectedFood" ref="food"></v-food>
  </div>
</template>
<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 177px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }

  .goods .menu-wrapper .memu-item {
    position: relative;
    display: table;
    width: 56px;
    height: 54px;
    padding: 0 12px;
    line-height: 14px;
    font-size: 0;
  }

  .goods .menu-wrapper .memu-item.current {
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    font-weight: 700;

  }

  .goods .menu-wrapper .memu-item.current .text::after {
    width: 0;
  }

  .goods .menu-wrapper .memu-item .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    margin-right: 2px;
  }

  .goods .menu-wrapper .memu-item .icon.icongoods {
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .goods .menu-wrapper .memu-item .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }

  .goods .menu-wrapper .memu-item .text::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    content: ' ';
  }

  .goods .foods-wrapper {
    flex: 1;
    font-size: 0;
  }

  .goods .foods-wrapper .foods-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .goods .foods-wrapper .foods-list .food-item {
    margin: 18px;
    padding-bottom: 18px;
    position: relative;
    display: flex;
  }

  .goods .foods-wrapper .foods-list .food-item::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    content: ' ';
  }

  .goods .foods-wrapper .foods-list .food-item:last-child {
    padding-bottom: 0;
  }

  .goods .foods-wrapper .foods-list .food-item:last-child::after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    content: ' ';
  }

  .goods .foods-wrapper .foods-list .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .goods .foods-wrapper .foods-list .food-item .content {
    flex: 1;
  }

  .goods .foods-wrapper .foods-list .food-item .content .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 0px;
  }

  .goods .foods-wrapper .foods-list .food-item .content .name {
    height: 14px;
    line-height: 14px;
    padding-top: 2px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .goods .foods-wrapper .foods-list .food-item .content .desc {
    line-height: 12px;
    margin: 8px 0;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .goods .foods-wrapper .foods-list .food-item .content .extra {
    height: 10px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .goods .foods-wrapper .foods-list .food-item .content .extra .count {
    margin-right: 8px;
  }

  .goods .foods-wrapper .foods-list .food-item .content .price {
    margin-top: 8px;
  }

  .goods .foods-wrapper .foods-list .food-item .content .price .now {
    font-size: 14px;
    margin-right: 8px;
    color: rgb(240, 20, 20);
    font-weight: normal;
  }

  .goods .foods-wrapper .foods-list .food-item .content .price .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  const ERR_OK = 0;
  //  const debug = process.env.NODE_ENV !== 'production';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this._followScroll(i);
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'invoice', 'special', 'guarantee'];
//      const url = debug ? '/api/goods' : 'http://ustbhuangyi.com/sell/api/goods'
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
//        体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _followScroll(index) {
        let menuList = this.$refs.menuList;
        let el = menuList[index];
        this.menuScroll.scrollToElement(el, 300, 0, -100);
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': food
    }

  };
</script>
