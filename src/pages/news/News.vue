<template>
  <div class="news" id="news">
    <back-top></back-top>

    <div class="toggle ub ub-ac ub-pa">
      <span v-for="(item,index) in toggle" :key="index" :class="{active:item.flag}" @click="cut(item.txt,item.hottest.url,item.hottest.param1,item.hottest.param2)">{{item.txt}}</span>
    </div>

    <span class="shai ub ub-pb" :class="{opacity0:screenS}" v-cloak>
      <div class="shai_box1 ub-f1 ub ub-ac" ref="shai_box1">
        <span :class="{active:screenHot}" @click="toggleHot(true)">最热</span>
        <span :class="{active:!screenHot}" @click="toggleHot(false)">最新</span>
      </div>
      <div class="shai_box2 ub-shrink0 ub ub-ac ub-pc" @click="screen(screenT)">
        <van-icon name="filter-o" />{{screenT}}
      </div>
    </span>

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
      screenW: 0, // 筛选宽度
      screenT: "筛选", // 筛选文字
      screenS: true,  // 筛选显隐
      screenHot: true, // true:最热 false:最新
      newsList: [],
      toggle: [
        {
          flag: true,
          txt: "推荐",
          hottest: { url: "/apiGas/link/hot", param1: "afterTime", param2: 0, },
          latest: { url: "/apiGas/link/hot", param1: "afterTime", param2: 0, },
        },
        {
          flag: false,
          txt: "大荟萃",
          hottest: { url: "/apiGas/link/news/hottest", param1: "afterScore", param2: 0, },
          latest: { url: "/apiGas/link/news/latest", param1: "afterTime", param2: 0, },
        },
        {
          flag: false,
          txt: "幽默段子",
          hottest: { url: "/apiGas/link/scoff/hottest", param1: "afterScore", param2: 0, },
          latest: { url: "/apiGas/link/scoff/latest", param1: "afterTime", param2: 0, },
        },
        {
          flag: false,
          txt: "程序猿",
          hottest: { url: "/apiGas/link/tec/hottest", param1: "afterScore", param2: 0, },
          latest: { url: "/apiGas/link/tec/latest", param1: "afterTime", param2: 0, },
        },
        {
          flag: false,
          txt: "求助问答",
          hottest: { url: "/apiGas/link/ask/hottest", param1: "afterScore", param2: 0, },
          latest: { url: "/apiGas/link/ask/latest", param1: "afterTime", param2: 0, },
        },
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
  async mounted() {
    this.screenW = this.$refs.shai_box1.offsetWidth;
    this.$refs.shai_box1.style.width = '0rem';
    await this.getNews(this.toggle[0].hottest.url, this.toggle[0].hottest.param1, this.toggle[0].hottest.param2)
  },
  methods: {
    // 导航切换
    async cut(txt, url, param1, param2) {
      this.newsList = [];
      this.screenHot = true;
      this.toggle.forEach((item, index) => {
        item.txt == txt ? item.flag = !item.flag : item.flag = false;
        if (item.txt == txt) { if (index == 0) { this.screenS = true; } else { this.screenS = false; } }
      })
      await this.getNews(url, param1, param2)
    },
    // 接口调用
    async getNews(url, param1, param2) {
      let param, flag = false;
      let infTimestamp = new Date().getTime();
      param = { [param1]: param2 || 0, '_': infTimestamp, }
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
    // 条件筛选
    screen() {
      if (this.screenT == "筛选") {
        this.$refs.shai_box1.style.width = this.screenW + 'px';
        this.screenT = "收起";
      } else if (this.screenT == "收起") {
        this.$refs.shai_box1.style.width = '0rem';
        this.screenT = "筛选";
      }
    },
    toggleHot(flag) {
      this.newsList = [];
      if (flag) { this.screenHot = true; }
      else { this.screenHot = false; }
      let _this = this;
      this.toggle.forEach(async item => {
        if (item.flag) {
          _this.screenHot == true ? await _this.getNews(item.hottest.url, item.hottest.param1, item.hottest.param2) : await _this.getNews(item.latest.url, item.latest.param1, item.latest.param2);
        }
      })
    },

    mescrollInit(mescroll) { this.mescroll = mescroll },
    async downCallback() {
      let obj = { url: "", param1: "", param2: "", }
      let _this = this;
      this.toggle.forEach((item, index) => {
        if (item.flag) {
          if (_this.screenHot) { obj.url = item.hottest.url; obj.param1 = item.hottest.param1; obj.param2 = item.hottest.param2; }
          else { obj.url = item.latest.url; obj.param1 = item.latest.param1; obj.param2 = item.latest.param2; }
        }
      })
      let result = await this.getNews(obj.url, obj.param1, obj.param2)
      if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); Toast.success('刷新成功'); }) }
      else { mescroll.endErr(); Toast.fail('刷新失败，请稍后再试！'); }
    },
    async getMore(url, param1, param2) {
      let param, flag = false;
      let infTimestamp = new Date().getTime();
      param = { [param1]: param2 || 0, '_': infTimestamp, }
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
      let _this = this;
      let infTimestamp = new Date().getTime();
      let infTimestamp2 = infTimestamp * 1000 - 10000000000;
      let randomN = publicMethods.randomNum(11409, 11413); // 最热的参数
      let randomN2 = publicMethods.randomNum2(1647000000000000, 1647300000000000); // 推荐的参数
      let randomN3 = publicMethods.randomNum2(infTimestamp2, infTimestamp * 1000); // 最新的参数
      let obj = { url: "", param1: "", param2: "", }

      this.toggle.forEach((item, index) => {
        if (item.flag) {
          if (!this.screenS) {
            if (_this.screenHot) { obj.url = item.hottest.url; obj.param1 = item.hottest.param1; obj.param2 = randomN; }
            else { obj.url = item.latest.url; obj.param1 = item.latest.param1; obj.param2 = randomN3; }
          }
          else {
            obj.url = item.hottest.url; obj.param1 = item.hottest.param1; obj.param2 = randomN2;
          }
        }
      })

      let result = await this.getMore(obj.url, obj.param1, obj.param2)
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
  .opacity0 {
    opacity: 0;
  }
  .shai {
    height: 0.9rem;
    letter-spacing: 0.02rem;
    position: fixed;
    top: 3.2rem;
    right: 2%;
    z-index: 2;
    .shai_box1 {
      overflow: hidden;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.7);
      transition: all 0.25s linear;
      span {
        display: inline-block;
        min-width: 1rem;
        text-align: center;
        margin: 0rem 0.3rem;
      }
    }
    .active {
      color: #f8aa00;
      border-bottom: 0.05rem solid #f8aa00;
    }
    .shai_box2 {
      width: 1.5rem;
      height: 100%;
      line-height: 0.9rem;
      letter-spacing: 0rem;
      color: #ffffff;
      background-color: rgba(0, 0, 0, 0.7);
      .van-icon-filter-o::before {
        margin-top: 0.05rem;
      }
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
        color: #3a3b3b;
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
