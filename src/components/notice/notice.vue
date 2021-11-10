/*
 * @Author: 王龙金 
 * @Date: 2021-11-10 14:33:41 
 * @Last Modified by: 王龙金
 * @Last Modified time: 2021-11-10 15:49:35
 */


<template>
  <div class="notice ub" ref="notice">
    <template v-if="showNotice" v-cloak>
      <div class="noticeIcon ub-shrink0">
        <van-icon name="bullhorn-o" />
      </div>
      <div class="noticeTxt ub-f1">
        <div id="annunciate">
          <slot name="noticeTxt">{{defaultNotice}}</slot>
        </div>
      </div>
      <div class="closeIcon ub-shrink0" @click="closeNotice">
        <van-icon name="cross" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['scroll'],
  data() {
    return {
      showNotice: true,
      defaultNotice: "人生在世只有一次，不必勉强选择自己不喜欢的路，随性而生或随性而死都没关系。不过，无论选择哪条路，都不要忘记保护自己所珍惜的人。",
    }
  },
  mounted() {
    if (this.scroll == true) this.move();
  },
  methods: {
    move() {
      // 获取内容区宽度
      let annunciate = document.getElementById("annunciate");
      let width = annunciate.scrollWidth;
      let speed = 10; // 位移距离
      // 设置位移
      setInterval(function () {
        speed = speed - 1;
        // 如果位移超过文字宽度，则回到起点
        if (Math.abs(speed) >= width) {
          speed = 300;
        }
        annunciate.style.transform = "translateX(" + speed + "px)";
      }, 40);
    },
    closeNotice() {
      this.showNotice = false;
      this.$refs.notice.style.height = 0;
    },
  }
};
</script>

<style lang="less" scoped>
.notice {
  width: 100%;
  height: 0.6rem;
  background-color: #ffffff;
  font-size: 0.4rem;
  color: #f1403c;
  font-weight: 400;
  font-family: Microsoft YaHei;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
}

.notice .noticeIcon,
.notice .closeIcon {
  width: 12%;
  height: 100%;
  line-height: 0.7rem;
  text-align: center;
}

.notice .closeIcon {
  color: #1a1a1a;
}

.notice .noticeTxt {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  overflow: hidden;
  white-space: nowrap;
}
</style>