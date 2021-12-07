<template>
  <div class="publicbottom ub">
    <div class="ub-f1 ub ub-ver ub-ac ub-pc">
      <div><img :src="barImg[0]" @click="toggleBar('home', 0)" /></div>
      <div :class="{ active: barShow == 'home' }" @click="toggleBar('home', 0)">
        首页
      </div>
    </div>
    <div class="ub-f1 ub ub-ver ub-ac ub-pc">
      <div><img :src="barImg[1]" @click="toggleBar('news', 1)" /></div>
      <div :class="{ active: barShow == 'news' }" @click="toggleBar('news', 1)">
        柚文
      </div>
    </div>
    <div class="ub-f1 ub ub-ver ub-ac ub-pc">
      <div><img :src="barImg[2]" @click="toggleBar('funny', 2)" /></div>
      <div :class="{ active: barShow == 'funny' }" @click="toggleBar('funny', 2)">
        柚趣
      </div>
    </div>
    <div class="ub-f1 ub ub-ver ub-ac ub-pc">
      <div><img :src="barImg[3]" @click="toggleBar('mine', 3)" /></div>
      <div :class="{ active: barShow == 'mine' }" @click="toggleBar('mine', 3)">
        我的
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barImg: [
        "static/image/bottom/active_home.png",
        "static/image/bottom/news.png",
        "static/image/bottom/funny.png",
        "static/image/bottom/mine.png"
      ],
      active_barImg: [
        "static/image/bottom/active_home.png",
        "static/image/bottom/active_news.png",
        "static/image/bottom/active_funny.png",
        "static/image/bottom/active_mine.png"
      ],
      barShow: "home"
    };
  },
  created: function () {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  methods: {
    toggleBar(txt, number) {
      this.barImg = [
        "static/image/bottom/home.png",
        "static/image/bottom/news.png",
        "static/image/bottom/funny.png",
        "static/image/bottom/mine.png"
      ];
      this.barShow = txt;
      this.barImg[number] = this.active_barImg[number];
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
