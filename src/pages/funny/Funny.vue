<template>
  <div class="funny" id="funny">
    <!-- 回到顶部 -->
    <back-top></back-top>

    <!-- 切换 -->
    <div class="toggle ub ub-ac" v-cloak>
      <span v-for="(item,index) in funny" :key="index" :class="{active:item.flag}" @click="toggle(item.txt,item.hottest.url,item.hottest.param1,item.hottest.param2)">{{item.txt}}</span>
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
      <template v-if="newest.length == 0">
        <div style="text-align:center;margin-top:1rem;">
          <van-loading size="24px">加载中...</van-loading>
        </div>
      </template>
      <template v-else>
        <!-- 瀑布流 -->
        <div class="waterfall">
          <waterfall :col="2" :data="newest">
            <ul class="waterfall-item ub-shrink0" v-for="(item, index) in newest" :key="index" @click="skip(item.url)">
              <li class="img">
                <img v-lazy="item.img_url" :alt="item.title" />
                <div class="marsk">{{ item.domain }}</div>
              </li>
              <li class="label" v-if="item.topicName">
                <span>{{ item.topicName }}</span>
              </li>
              <li class="title" v-if="item.title">{{ item.title }}</li>
              <li class="talk ub">
                <span>
                  <van-icon name="fire-o" color="#ee0a24" />&nbsp;{{ item.ups }}
                </span>
                <span>
                  <van-icon name="chat-o" />&nbsp;{{ item.commentsCount }}
                </span>
              </li>
              <li class="ub base">
                <div class="img ub-shrink0 ub ub-ac">
                  <img v-lazy="item.submitted_user.img_url" :alt="item.submitted_user.nick" />
                </div>
                <div class="txt ub-f1 ub ub-ver">
                  <span>{{ item.submitted_user.nick }}</span>
                  <span>{{ item.created_time }}</span>
                </div>
              </li>
            </ul>
          </waterfall>
        </div>
      </template>
    </mescroll-vue>

  </div>
</template>

<script>
import { Toast } from 'vant';
import BackTop from '../../components/backTop/backTop.vue';
import publicMethods from '../../utils/publicMethods.js';
import MescrollVue from 'mescroll.js/mescroll.vue'

export default {
  components: { BackTop, MescrollVue, },
  activated() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("bottomNavigation", 'funny');
  },
  data() {
    return {
      screenW: 0, // 筛选宽度
      screenT: "筛选", // 筛选文字
      screenS: false,  // 筛选显隐
      screenHot: true, // true:最热 false:最新
      newest: [],
      funny: [
        {
          flag: true,
          txt: "图片",
          hottest: { url: "/apiGas/link/pic/hottest", param1: "afterScore", param2: 0, },
          latest: { url: "/apiGas/link/pic/latest", param1: "afterTime", param2: 0, },
        },
      ],
      currentIndex: 2,
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
          warpId: 'funny',
          src: '../../../static/image/public/backTop.png',
          warpClass: "backToTop",
        },
      },
    };
  },
  async mounted() {
    this.screenW = this.$refs.shai_box1.offsetWidth;
    this.$refs.shai_box1.style.width = '0rem';
    await this.getNewest(this.funny[0].hottest.url, this.funny[0].hottest.param1, this.funny[0].hottest.param2);
  },
  methods: {
    skip(url) { window.location.href = url; },
    async toggle(txt, url, param1, param2) {
      this.newest = [];
      this.screenHot = true;

      this.funny.forEach((item, index) => {
        item.txt == txt ? item.flag = !item.flag : item.flag = false;
        // if (item.txt == txt) { if (index == 0) { this.screenS = true; } else { this.screenS = false; } }
      })

      await this.getNewest(url, param1, param2)
    },
    async getNewest(url, param1, param2) {
      let flag, param, infTimestamp;
      infTimestamp = new Date().getTime();
      param = { [param1]: param2 || 0, '_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          this.newest = res.data;
          this.newest = publicMethods.filterTime(this.newest);
          flag = true;
          return flag;
        } else {
          Toast({
            message: "柚柚很抱歉，接口请求失败了！",
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
      this.newest = [];
      if (flag) { this.screenHot = true; }
      else { this.screenHot = false; }
      let _this = this;
      this.funny.forEach(async item => {
        if (item.flag) {
          _this.screenHot == true ? await _this.getNewest(item.hottest.url, item.hottest.param1, item.hottest.param2) : await _this.getNewest(item.latest.url, item.latest.param1, item.latest.param2);
        }
      })
    },

    mescrollInit(mescroll) { this.mescroll = mescroll },
    async downCallback() {
      let obj = { url: "", param1: "", param2: "", }
      let _this = this;
      this.funny.forEach((item, index) => {
        if (item.flag) {
          if (_this.screenHot) { obj.url = item.hottest.url; obj.param1 = item.hottest.param1; obj.param2 = item.hottest.param2; }
          else { obj.url = item.latest.url; obj.param1 = item.latest.param1; obj.param2 = item.latest.param2; }
        }
      })
      let result = await this.getNewest(obj.url, obj.param1, obj.param2)
      if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); Toast.success('刷新成功'); }) }
      else { mescroll.endErr(); Toast.fail('刷新失败，请稍后再试！'); }
    },
    // 加载更多
    async moreNewest(url, param1, param2) {
      let param, result;
      let infTimestamp = new Date().getTime();
      param = { [param1]: param2 || 0, '_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          let foo = []; foo = res.data;
          foo = publicMethods.filterTime(foo);
          foo.forEach(item => { this.newest.push(item); })
          result = true;
          return result;
        } else {
          Toast({
            message: "柚柚很抱歉，接口请求失败了！",
            duration: 1500,
            forbidClick: true
          });
          result = false;
          return result;
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
      let randomN3 = publicMethods.randomNum2(infTimestamp2, infTimestamp * 1000); // 最新的参数
      let randomN2 = publicMethods.randomNum2(1647000000000000, 1647300000000000); // 推荐的参数
      let obj = { url: "", param1: "", param2: "", }

      this.funny.forEach((item, index) => {
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
      let result = await this.moreNewest(obj.url, obj.param1, obj.param2)
      if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); }) }
      else { mescroll.endErr(); Toast.fail('加载失败，请稍后再试！'); }
    },
  }
};
</script>

<style lang="less" scoped>
/deep/ .vue-waterfall-column:nth-last-of-type(1) ul {
  float: right;
}
.funny {
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
    padding: 0.2rem;
    box-sizing: border-box;
    letter-spacing: 0.02rem;
    background-color: #ffffff;
    border-bottom: 0.03rem solid lightgray;
    position: fixed;
    top: 1.7rem;
    left: 2%;
    z-index: 2;
    span {
      margin-right: 1rem;
    }
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
    top: 2.8rem;
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
  .waterfall {
    width: 96%;
    margin: 0 auto;
    margin-top: 0.5rem;

    .waterfall-item {
      width: 96%;
      margin-bottom: 8%;
      background-color: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
      box-shadow: 0rem 0rem 0.15rem 0rem rgba(0, 0, 0, 0.4);
      .label,
      .title,
      .talk {
        padding: 0.1rem 0.25rem;
        box-sizing: border-box;
      }
      .img {
        position: relative;
        background-color: #fff;
        img {
          width: 100%;
          max-height: 10rem;
        }
        .marsk {
          position: absolute;
          bottom: 0.1rem;
          left: 0;
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          color: #ffffff;
          opacity: 0.6;
          background: rgba(0, 0, 0, 0.4);
        }
      }
      .label {
        width: 100%;
        min-height: 0.4rem;
        position: relative;

        span {
          display: inline-block;
          width: 80%;
          height: 0.5rem;
          line-height: 0.5rem;
          padding-right: 0.2rem;
          padding-left: 0.6rem;
          color: #ffffff;
          font-weight: bold;
          background-color: #f49900;
          border-radius: 1rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          &::before {
            content: "";
            position: absolute;
            top: 0.1rem;
            left: 0.2rem;
            width: 0.5rem;
            height: 0.5rem;
            background: url("../../../static/image/funny/comments_logo.png")
              no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .title {
        width: 100%;
        height: 1.1rem;
        line-height: 0.5rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #4b4c4d;
      }
      .talk {
        border-bottom: 0.05rem dotted lightgray;
        span {
          margin-right: 0.5rem;
        }
      }
      .base {
        padding: 0.1rem 0.25rem;
        box-sizing: border-box;
      }
      .base .img {
        margin-right: 0.15rem;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .base .txt {
        span {
          display: inline-block;
          width: 100%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.38rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          &:nth-of-type(2) {
            font-size: 0.3rem;
            color: #929191;
          }
        }
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
