<template>
  <div id="app">
    <public-header v-if="header_show"></public-header>
    <keep-alive>
      <router-view v-on:header='header' v-on:footer='footer' class="article" />
    </keep-alive>
    <public-bottom v-if="footer_show"></public-bottom>
  </div>
</template>

<script>
import publicHeader from "@/components/header/publicHeader.vue";
import publicBottom from '@/components/bottom/publicBottom.vue';

export default {
  name: "App",
  components: { publicHeader, publicBottom },
  data() {
    return {
      header_show: true,
      footer_show: true,
    }
  },
  methods: {
    //是否显示头部
    header: function (bool) {
      this.header_show = bool;
    },
    //是否显示底部
    footer: function (bool) {
      this.footer_show = bool;
    }
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
