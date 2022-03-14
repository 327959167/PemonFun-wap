<template>
  <div class="publicbottom ub">
    <div class="ub-f1 ub ub-ver ub-ac ub-pc" v-for="(item,index) in barImg" :key="index" @click="toggleBar(item.id)">
      <template v-if="barShow != item.nav">
        <div><img :src="item.img" alt="item.nav"></div>
      </template>
      <template v-else>
        <div><img :src="item.img2" alt="item.nav"></div>
      </template>
      <div :class="{active:barShow == item.nav}">{{item.txt}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    barShow: {
      type: String,
      require: true,
      default: 'home',
    },
  },
  data() {
    return {
      barImg: [
        { id: 0, nav: "home", txt: "首页", img: "static/image/bottom/home.png", img2: "static/image/bottom/active_home.png", },
        { id: 1, nav: "news", txt: "柚文", img: "static/image/bottom/news.png", img2: "static/image/bottom/active_news.png", },
        { id: 2, nav: "funny", txt: "柚趣", img: "static/image/bottom/funny.png", img2: "static/image/bottom/active_funny.png", },
        { id: 3, nav: "mine", txt: "我的", img: "static/image/bottom/mine.png", img2: "static/image/bottom/active_mine.png", },
      ],
    };
  },
  created: function () {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  methods: {
    toggleBar(number) {
      switch (number) {
        case 0:
          this.$router.push("/home");
          break;
        case 1:
          this.$router.push("/news");
          break;
        case 2:
          this.$router.push("/funny");
          break;
        case 3:
          this.$router.push("/mine");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less">
@import url("../../assets/css/global.less");
.publicbottom {
  width: 100%;
  height: 1.6rem;
  border-top: 1px solid rgb(230, 227, 227);
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 999;
  font-size: 0.3rem;
  color: #000000;
  background-color: #fff;
  img {
    width: 0.8rem;
    height: 0.8rem;
    margin-bottom: 0.05rem;
  }
  .active {
    color: @primary-color;
  }
}
</style>
