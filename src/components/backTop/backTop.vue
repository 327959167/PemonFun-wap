<template>
  <div class="backtop">
    <div class="top" @click="backtop" v-if="backtopShow" v-cloak>
      <van-icon name="back-top" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backtopShow: false,
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    backtop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 400) {
        this.backtopShow = true;
      } else {
        this.backtopShow = false;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.backtop {
  width: 1rem;
  float: right;
  background: rgba(82, 51, 51, 0.4);
  position: sticky;
  bottom: 2rem;
  right: 0.5rem;
  z-index: 999;
}
.top {
  width: 1rem;
  height: 1rem;
  line-height: 1.25rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.8rem;
}
</style>