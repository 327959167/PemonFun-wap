<template>
  <div class="publicheader ub ub-ac">
    <div class="back ub-shrink0 ub ub-ac ub-pc" @click="back">&lt;</div>
    <div class="search ub-f1 ub ub-ver">
      <ul class="search_box1">
        <li v-for="(item, index) in hotIncident" :key="index" @click="skip(item.url)">{{item.txt}}</li>
      </ul>
    </div>
    <div class="service ub-shrink0 ub ub-ac ub-pc" @click="service">
      <img src="static/image/header/service.png">
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      hotIncident: [
        {
          txt: "台湾正式完全收复：台领导人将于明日正式与总书记展开会晤",
          url: "",
        },
        {
          txt: "10G正式投入商用，民众有望于年底开始使用",
          url: "",
        }, {
          txt: "我国第一批火星移民预计将在三月份进行，届时火星移民总人数将突破一千万",
          url: "",
        }, {
          txt: "日遭遇史上最强地震，震级达到9.1级。因地震带来的海啸、火山喷发、国土板块撕裂等自然灾害日一半国土将沉入海底，日本民众该何去何从",
          url: "",
        },
        {
          txt: "台湾正式完全收复：台领导人将于明日正式与总书记展开会晤",
          url: "",
        },
      ],
    }
  },
  mounted() { this.hotNews(); },
  methods: {
    back() {
      let url = this.$store.state.backUrl;
      if (url !== "mine" && url !== "news" && url !== "funny" && url !== "home") { this.$router.go(-1); }
    },
    skip(url) { if (url) { window.location.href = url; } else { Toast.fail("祈祷世界和平，程序员不在内卷"); } },
    service() { Toast.fail("我累了，找到富萝莉后有时间以后再写吧") },
    hotNews() {
      let len = 1;
      let height = document.querySelector('.search').offsetHeight;
      let search_box1 = document.querySelector('.search_box1')
      let _this = this;
      setInterval(() => {
        if (len < _this.hotIncident.length) {
          search_box1.style.transition = "all 0.3s linear";
          search_box1.style.transform = "translateY(-" + height * len + "px)";
          len++;
        } else if (len == _this.hotIncident.length) {
          search_box1.style.transition = "none";
          search_box1.style.transform = "translateY(" + 0 + "px)";
          len = 1;
        }
      }, 3000)
    },
  }
}
</script>

<style lang="less">
@import url("../../assets/css/global.less");
.publicheader {
  width: 100%;
  height: 1.2rem;
  background-color: @primary-color;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  .back,
  .service {
    width: 1rem;
    height: 100%;
    font-size: 0.6rem;
    color: #ffffff;
  }
  .service img {
    width: 0.7rem;
    height: 0.7rem;
  }
  .search {
    height: 0.9rem;
    border-radius: 1rem;
    background-color: #fff;
    padding: 0rem 0.4rem;
    box-sizing: border-box;
    overflow: hidden;
    ul {
      height: 0.9rem;
      // transition: all 0.3s linear;
      li {
        width: 7.2rem;
        line-height: 0.9rem;
        color: #797676;
        font-size: 0.4rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>