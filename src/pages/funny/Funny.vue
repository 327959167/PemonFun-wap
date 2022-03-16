<template>
  <div class="funny" id="funny">
    <!-- 回到顶部 -->
    <back-top></back-top>

    <!-- 切换 -->
    <div class="toggle ub ub-ac" v-cloak>
      <span v-for="(item,index) in funny" :key="index" :class="{active:item.flag}" @click="toggle(item.txt)">{{item.txt}}</span>
    </div>

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
      newest: [],
      funny: [
        { id: 0, txt: "最热", flag: true, url: "/apiGas/link/pic/hottest", param: "afterScore", paramN: 0, },
        { id: 1, txt: "最新", flag: false, url: "/apiGas/link/pic/latest", param: "afterTime", paramN: 0, },
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
    await this.getNewest(this.funny[0].url, this.funny[0].param, this.funny[0].paramN,);
  },
  methods: {
    skip(url) { window.location.href = url; },
    async toggle(flag) {
      this.funny.forEach(async (item, index) => {
        if (item.txt == flag) { item.flag = true; this.newest = []; await this.getNewest(item.url, item.param, item.paramN); }
        else { item.flag = false; }
      })
    },
    async getNewest(url, param, paramN) {
      let flag, params, infTimestamp;
      infTimestamp = new Date().getTime();
      params = `{ "${param}": ${paramN}, '_': ${infTimestamp}, }`
      try {
        let res = await this.$get(url, params);
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

    mescrollInit(mescroll) { this.mescroll = mescroll },
    downCallback() {
      this.funny.forEach(async (item, index) => {
        if (item.flag) {
          let result = await this.getNewest(item.url, item.param, item.paramN);
          if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); Toast.success('刷新成功'); }) }
          else { mescroll.endErr(); Toast.fail('刷新失败，请稍后再试！'); }
        }
      })
    },

    // 加载更多
    async moreNewest(url) {
      let param, infTimestamp, result;
      infTimestamp = new Date().getTime();

      this.funny.forEach(item => {
        if (item.flag) {
          if (item.txt == "最热") {
            let num1 = this.randomNum(11407, 11409);
            param = { 'afterScore': num1, '_': infTimestamp, }
          } else if (item.txt == "最新") {
            let num2 = parseInt(new Date().getTime()) - parseInt(this.currentIndex * 60 * 60 * 1000);
            param = { 'afterTime': num2 * 1000, '_': infTimestamp, }
            this.currentIndex += 2;
          }
        }
      })

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
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseFloat(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseFloat(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    randomNum2(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    upCallback() {
      this.funny.forEach(async (item, index) => {
        if (item.flag) {
          let result = await this.moreNewest(item.url);
          if (result) { this.$nextTick(() => { this.mescroll.endSuccess(); }) }
          else { mescroll.endErr(); Toast.fail('加载失败，请稍后再试！'); }
        }
      })
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
