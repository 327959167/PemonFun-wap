<template>
  <div class="news" id="news">
    <back-top></back-top>

    <div class="toggle ub ub-ac ub-pa">
      <span v-for="(item,index) in toggle" :key="index" :class="{active:item.flag}" @click="cut(item.txt,item.url)">{{item.txt}}</span>
    </div>

    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <template v-if="newsList.length == 0">
        <div style="text-align:center;margin-top:1rem;">
          <van-loading size="24px">加载中...</van-loading>
        </div>
      </template>
      <template v-else>
        <ul class="article">
          <li class="ub" v-for="(item,index) in newsList" :key="index">
            <div class="top ub ub-ver ub-f1 ub-pb">
              <div class="txt">{{item.title}}</div>
              <div class="time">{{item.created_time}}</div>
            </div>
            <div class="bottom"><img v-lazy="item.img_url" alt="柚文"></div>
          </li>
        </ul>
      </template>
    </mescroll-vue>

  </div>
</template>

<script>
import { Toast } from 'vant';
import MescrollVue from 'mescroll.js/mescroll.vue'
import publicMethods from '../../utils/publicMethods.js';
import BackTop from '../../components/backTop/backTop.vue';

export default {
  components: { MescrollVue, BackTop, },
  data() {
    return {
      newsList: [],
      toggle: [
        { txt: "最新热文", flag: true, url: "/apiGas/link/news/hottest", afterScore: null, },
        { txt: "人类发布", flag: false, url: "/apiGas/man", afterTime: null, },
        { txt: "幽默段子", flag: false, url: "/apiGas/link/scoff/hottest", afterScore: null, },
        { txt: "求助问答", flag: false, url: "/apiGas/link/ask/hottest", afterScore: null, },
      ],
      // mescroll
      mescroll: null,
      mescrollDown: {
        auto: false,
        callback: this.downCallback,
        textLoading: "拼命加载中……",
      },
      mescrollUp: {
        auto: false,
        callback: this.upCallback,
        toTop: {
          warpId: 'news',
          src: '../../../static/image/public/backTop.png',
          warpClass: "backToTop",
        },
      },
    }
  },
  activated() {
    this.$emit('header', true);
    this.$emit('footer', true);
    this.$emit("bottomNavigation", 'news');
  },
  async mounted() { await this.getNews(this.toggle[0].url) },
  methods: {
    // 导航切换
    async cut(txt, url) {
      this.newsList = [];
      this.toggle.forEach((item, index) => {
        item.txt == txt ? item.flag = !item.flag : item.flag = false;
      })
      await this.getNews(url)
    },
    // 接口调用
    async getNews(url, afterScore) {
      let param, flag = false;
      let infTimestamp = new Date().getTime();
      param = { 'afterScore': afterScore || 0, '_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          this.newsList = res.data;
          this.newsList = publicMethods.filterTime(this.newsList);
          flag = true;
          return flag;
        } else {
          Toast({
            message: "猜你喜欢接口请求失败",
            duration: 1500,
            forbidClick: true
          });
          flag = false;
          return flag;
        }
      } catch (error) {
        console.log(error);
      }
    },

    mescrollInit(mescroll) { this.mescroll = mescroll },
    async downCallback() {
      let obj = { url: "", afterScore: "", }
      this.toggle.forEach((item, index) => {
        if (item.flag) { obj.url = item.url; obj.afterScore = item.afterScore; }
      })
      let result = await this.getNews(obj.url, obj.afterScore)
      if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); Toast.success('刷新成功'); }) }
      else { mescroll.endErr(); Toast.fail('刷新失败，请稍后再试！'); }
    },
    async getMore(url, afterScore) {
      let param, flag = false;
      let infTimestamp = new Date().getTime();
      param = { 'afterScore': afterScore || 0, '_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          let arr = res.data;
          arr = publicMethods.filterTime(arr);
          arr.forEach((item, index) => { this.newsList.push(item); })
          flag = true;
          return flag;
        } else {
          Toast({
            message: "猜你喜欢接口请求失败",
            duration: 1500,
            forbidClick: true
          });
          flag = false;
          return flag;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async upCallback() {
      let obj = { url: "", afterScore: "", }
      this.toggle.forEach((item, index) => { if (item.flag) { obj.url = item.url; } })
      let result = await this.getMore(obj.url, obj.afterScore)
      if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); }) }
      else { mescroll.endErr(); Toast.fail('加载失败，请稍后再试！'); }
    },

  },
}
</script>

<style lang="less" scoped>
.news {
  width: 100%;
  min-height: 100vh;
  font-size: 0.4rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: Microsoft YaHei;
  position: relative;
  padding-top: 1.2rem;
  padding-bottom: 2rem;
  .toggle {
    width: 96%;
    padding: 0.2rem 0rem;
    box-sizing: border-box;
    letter-spacing: 0.02rem;
    background-color: #ffffff;
    border-bottom: 0.03rem solid lightgray;
    position: fixed;
    top: 1.7rem;
    left: 2%;
    z-index: 2;
    .active {
      color: #f8aa00;
      font-weight: bold;
      border-bottom: 0.05rem solid #f8aa00;
    }
  }
  .article {
    width: 96%;
    margin: 0.5rem auto 0rem;
    background-color: #ffffff;
    padding: 0rem 0.3rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
    li {
      padding: 0.35rem 0rem;
      box-sizing: border-box;
      border-bottom: 0.03rem dotted lightgray;
      &:last-of-type {
        border-bottom: none;
      }
    }
    .top {
      .txt {
        line-height: 0.5rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .time {
        font-size: 0.3rem;
        color: #929191;
        margin-top: 0.3rem;
      }
    }
    .bottom {
      width: 1.5rem;
      height: 100%;
      margin-left: 0.4rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-top: 0.08rem;
      }
    }
  }
  .mescroll {
    position: fixed;
    top: 2.3rem;
    bottom: 0;
    height: 18rem;
  }
  /deep/ .backToTop {
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    bottom: 2rem;
    right: 0.5rem;
    z-index: 999;
  }
}
</style>
