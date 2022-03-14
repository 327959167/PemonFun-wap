<template>
  <div class="notice ub" ref="notice">
    <template v-if="showNotice" v-cloak>
      <div class="noticeIcon ub-shrink0">
        <van-icon name="bullhorn-o" />
      </div>
      <div class="noticeTxt ub-f1 ub" ref="noticeTxt">
        <ul class="ub" ref="noticeTxt_box1">
          <li v-for="(item, index) in noticeText" :key="index">{{item}}</li>
        </ul>
        <ul class="ub" ref="noticeTxt_box2"></ul>
      </div>
      <div class="closeIcon ub-shrink0" @click="closeNotice">
        <van-icon name="cross" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    scroll: { type: Boolean, require: true, default: true, },
    noticeText: { type: Array, require: true, },
  },
  data() { return { showNotice: true, } },
  mounted() { if (this.scroll == true) this.move(); },
  methods: {
    move() {
      let noticeTxt = this.$refs.noticeTxt
      let box1 = this.$refs.noticeTxt_box1
      let box2 = this.$refs.noticeTxt_box2
      box2.innerHTML = box1.innerHTML
      function scrollLeft() {
        if (noticeTxt.scrollLeft >= box1.offsetWidth) {
          noticeTxt.scrollLeft = 0;
        } else {
          noticeTxt.scrollLeft++;
        }
      }
      setInterval(scrollLeft, 40);
    },
    closeNotice() { this.showNotice = false; this.$refs.notice.style.height = 0; },
  }
};
</script>

<style lang="less" scoped>
.notice {
  width: 100%;
  height: 0.8rem;
  background-color: #ffffff;
  font-size: 0.4rem;
  color: #f1403c;
  font-weight: 400;
  font-family: Microsoft YaHei;
  position: absolute;
  top: 1.2rem;
  left: 0;
  z-index: 98;
  .noticeIcon,
  .closeIcon {
    width: 12%;
    line-height: 0.9rem;
    text-align: center;
  }
  .closeIcon {
    color: #1a1a1a;
  }
  .noticeTxt {
    width: 100%;
    overflow: hidden;
    li {
      height: 0.8rem;
      line-height: 0.8rem;
      white-space: nowrap;
      margin-right: 1rem;
    }
  }
}
</style>