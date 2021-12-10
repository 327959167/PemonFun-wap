<template>
  <div id="app">
    <public-header v-if="header_show"></public-header>
    <keep-alive>
      <router-view v-on:header='header' v-on:footer='footer' v-on:bottomNavigation='bottomNavigation' class="article" />
    </keep-alive>
    <public-bottom v-if="footer_show" :barShow="barShow"></public-bottom>
  </div>
</template>

<script>
import publicHeader from "@/components/header/publicHeader.vue";
import publicBottom from '@/components/bottom/publicBottom.vue';


export default {
  name: "App",
  components: { publicHeader, publicBottom, },
  data() {
    return {
      header_show: true,
      footer_show: true,
      barShow: "",
    }
  },
  methods: {
    //是否显示头部
    header(bool) {
      this.header_show = bool;
    },
    //是否显示底部
    footer(bool) {
      this.footer_show = bool;
    },
    // 底部导航
    bottomNavigation(bar1) {
      this.barShow = bar1;
    },
  }
}
</script>

<style lang="less">
@import url("assets/css/normalize.css");
@import url("assets/css/flex.css");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.article {
  min-height: 100vh;
}
</style>
