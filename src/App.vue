<template>
  <div id="app">
    <public-header v-if="header_show"></public-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-on:header='header' v-on:footer='footer' v-on:bottomNavigation='bottomNavigation' />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-on:header='header' v-on:footer='footer' v-on:bottomNavigation='bottomNavigation' />
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
    // 图片加载失败时的默认图片
    // errImg() {
    //   setTimeout(document.querySelector('img').each(function () {
    //     document.querySelector('img').attr("onerror", "if(value.length>11)value=value.slice(0,11)");
    //   }), 1000);
    // },
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
  background-color: #f5f5f5;
}
</style>
