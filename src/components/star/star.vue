<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClass" :class="itemClass" class="star-item" key="idnex">
        </span>
    </div>
</template>
<style scoped>
  .star {
    font-size: 0px;
  }

  .star .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  .star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }

  .star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
  }

  .star.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
  }

  .star.star-48 .star-item:last-child,
  .star.star-36 .star-item:last-child,
  .star.star-24 .star-item:last-child {
    margin-right: 0;
  }

</style>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClass() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
      if (hasDecimal) {
      result.push(CLS_HALF);
    }
      while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
      return result;
      }
    }
  };
</script>
