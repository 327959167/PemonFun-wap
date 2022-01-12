<template>
  <div class="waterfall" ref="waterfall">
    <div class="waterfall-box">1</div>
    <div class="waterfall-box">2</div>
    <div class="waterfall-box">3</div>
    <div class="waterfall-box">4</div>
    <div class="waterfall-box">5</div>
    <div class="waterfall-box">6</div>
    <div class="waterfall-box">7</div>
    <div class="waterfall-box">8</div>
    <div class="waterfall-box">9</div>
    <div class="waterfall-box">10</div>
  </div>
</template>

<script>
export default {
  props: {
    rightDistance: {
      type: Number,
      default: 10,
    },
    bottomDistance: {
      type: Number,
      default: 10,
    },
  },
  mounted() {
    this.waterfall()
    window.onresize = () => { this.waterfall() }
  },
  methods: {
    waterfall() {
      // 获取所有项目、容器宽度、项目宽度、项目右下边距、显示列数、保存高度数组
      let waterfallItems = this.$refs.waterfall.children
      let w_box = this.$refs.waterfall.offsetWidth
      let w_boxItem = waterfallItems[1].offsetWidth
      let column = Math.ceil(w_box / (w_boxItem + this.rightDistance));
      console.log(column);
      let arr = []

      for (var i = 0; i < waterfallItems.length; i++) {
        // 确定第一行排布
        if (i < column) {
          waterfallItems[i].style.top = 0; // top 0
          waterfallItems[i].style.left = (w_boxItem + this.rightDistance) * i + 'px'; // left 项目宽度+右边距
          arr.push(waterfallItems[i].offsetHeight); // 第一列高度
        } else {
          var minHeight = arr[0];
          var index = 0;
          // 计算第一列最小高度
          for (var j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
              minHeight = arr[j];
              index = j;
            }
          }
          // 在第一列最小高度下定位新的项目
          waterfallItems[i].style.top = arr[index] + this.bottomDistance + 'px'; // top 最小项目高度+下边距
          waterfallItems[i].style.left = waterfallItems[index].offsetLeft + 'px'; // left 最小高度的项目距离页面左边的距离
          // 将之前最小高度的项目重新赋值（此时他的高度是原来高度+新添加的项目高度+下编剧）（此时最小高度项目已经变化）
          arr[index] = arr[index] + waterfallItems[i].offsetHeight + this.bottomDistance;
        }
      }
    }
  },
}
</script>

<style scoped lang="less">
.waterfall {
  position: relative;
  width: 96%;
  height: 200vh;
  margin: 0 auto;
  .waterfall-box {
    position: absolute;
    width: 4.6rem;
    height: 6rem;
    background-color: tan;
    border-radius: 0.3rem;
    overflow: hidden;
    &:nth-of-type(1) {
      height: 6rem;
    }
    &:nth-of-type(2) {
      height: 5rem;
    }
    &:nth-of-type(3) {
      height: 4rem;
    }
    &:nth-of-type(4) {
      height: 7rem;
    }
    &:nth-of-type(5) {
      height: 7rem;
    }
    &:nth-of-type(6) {
      height: 8rem;
    }
    &:nth-of-type(7) {
      height: 7rem;
    }
    &:nth-of-type(8) {
      height: 5rem;
    }
    &:nth-of-type(9) {
      height: 7rem;
    }
    &:nth-of-type(10) {
      height: 2rem;
    }
  }
}
</style>