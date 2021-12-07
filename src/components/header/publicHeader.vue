<template>
  <div class="publicheader ub ub-ac">
    <div class="back ub ub-ac ub-pc" @click="back">&lt;</div>
    <div class="search ub-f1 ub ub-ac">
      <div>{{showHotIntro.txt}}</div>
    </div>
    <div class="service ub ub-ac ub-pc" @click="service">
      <img src="static/image/header/service.png">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotIncident: [
        {
          txt: "台领导人下台，台正式完全收复11111111111111111111111111",
          url: "",
        },
        {
          txt: "10G正式投入使用，民众有望于年底开始使用111111111111",
          url: "",
        }, {
          txt: "今年第一批火星移民预计将在三月份进行，届时火星移民总人数将突破一千万",
          url: "",
        }, {
          txt: "日本富士山喷发，日一半国土将沉入海底，日本民众该何去何从111111111111",
          url: "",
        },
      ],
      showHotIntro: {},
    }
  },
  mounted() {
    this.hotNews();
  },
  methods: {
    back() {
      let url = this.$store.state.backUrl;
      if (url !== "mine" && url !== "news" && url !== "funny") {
        this.$router.go(-1);
      }
    },
    service() {
      window.location.href = 'https://327959167.github.io/MusicPlayer/longjin-MusicAudio/music.html';
    },
    hotNews() {
      this.showHotIntro = this.hotIncident[Math.floor((Math.random() * this.hotIncident.length))];
      setInterval(() => {
        this.showHotIntro = this.hotIncident[Math.floor((Math.random() * this.hotIncident.length))];
      }, 6000)
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
    width: 80%;
    height: 75%;
    border-radius: 1rem;
    background-color: #fff;
    overflow: hidden;
    padding: 0 0.4rem;
    box-sizing: border-box;

    div {
      width: 80%;
      height: 100%;
      line-height: 0.9rem;
      font-size: 0.4rem;
      color: #797676;
      white-space: nowrap;
      text-overflow: ellipsis;
      -moz-text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>