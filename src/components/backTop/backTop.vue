<template>
  <div class="backtop">
    <div class="top" @click="backtop" v-if="backtopShow" v-cloak>
      <img src="../../../static/image/public/backTop.png">
    </div>
  </div>
</template>

<script>
export default {
  data() { return { backtopShow: false, } },
  mounted() { window.addEventListener("scroll", this.handleScroll); },
  methods: {
    backtop() { window.scroll({ top: 0, behavior: "smooth", }); },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop > 400 ? this.backtopShow = true : this.backtopShow = false;
    },
  },
}
</script>

<style lang="less" scoped>
.backtop {
  width: 1rem;
  float: right;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  bottom: 2rem;
  right: 0.5rem;
  z-index: 999;
}
.top {
  width: 1rem;
  height: 1rem;
  text-align: center;
  img {
    width: 0.9rem;
    height: 0.9rem;
    margin-top: 0.1rem;
  }
}
</style>