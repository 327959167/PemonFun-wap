<template>
  <div class="funny">
    <!-- 回到顶部 -->
    <back-top></back-top>
    <!-- 切换 -->
    <div class="toggle ub ub-ac">
      <span :class="{ active: toggleShow == 'hot' }" @click="toggle('hot')">最热</span>
      <span :class="{ active: toggleShow == 'new' }" @click="toggle('new')">最新</span>
    </div>
    <!-- 瀑布流 -->
    <div class="waterfall">
      <div v-if="newest.length == 0">
        <van-loading color="#0094ff" type="spinner" vertical size="24px">加载中...</van-loading>
      </div>
      <div v-else>
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
                <span>{{ item.action_time }}</span>
              </div>
            </li>
          </ul>
        </waterfall>
      </div>
    </div>
  </div>
</template>

<script>
import BackTop from '../../components/backTop/backTop.vue';

export default {
  components: { BackTop, },
  activated() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("bottomNavigation", 'funny');
  },
  data() {
    return {
      toggleShow: "hot",
      newest: [],
      hot: "/apiGas/link/pic/hottest?afterScore=0",
      new: "/apiGas/link/pic/latest?afterTime=0",
    };
  },
  async mounted() {
    await this.getNewest(this.hot);
  },
  methods: {
    async toggle(flag) {
      this.toggleShow = flag;
      this.newest = [];
      if (this.toggleShow == 'new') { await this.getNewest(this.new); }
      else if (this.toggleShow == 'hot') { await this.getNewest(this.hot); }
    },
    skip(url) {
      window.location.href = url;
    },
    async getNewest(url) {
      // 接口时间戳
      let infTimestamp = `&_=${new Date().getTime()}`;
      let path = url + infTimestamp;
      // 时间戳
      var timestamp = new Date().getTime();

      try {
        let res = await this.$get(path);
        if (res.success && res.code == 200) {
          this.newest = res.data;
          this.newest.forEach((item, index) => {
            let foo1 = timestamp - (item.action_time / 1000);
            let realy = Math.floor(foo1 / 1000)
            let h = Math.floor(realy / 3600)
            let m = Math.floor(realy % 3600 / 60)
            if (h != 0) {
              var str = `${h}小时${m}分前发布`
            } else {
              var str = `${m}分钟前发布`
            }
            item.action_time = str;
          })
        } else {
          Toast({
            message: "猜你喜欢接口请求失败",
            duration: 1500,
            forbidClick: true
          });
        }
      } catch (error) {
        console.log(error);
      }
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
  font-size: 0.4rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: Microsoft YaHei;
  background-color: #f5f5f5;
  padding-top: 0.5rem;
  position: relative;

  .toggle {
    width: 96%;
    margin: 0 auto;
    padding: 0.2rem;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: 0 8px 12px #ebedf0;
    span {
      margin-right: 0.5rem;
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
      width: 95%;
      margin-bottom: 0.3rem;
      border: 0.05rem solid #fbc2eb;
      background-color: #fff;
      border-radius: 0.3rem;
      overflow: hidden;
      box-shadow: 0rem 0rem 0.15rem 0rem rgba(0, 0, 0, 0.2);
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
        margin-right: 0.1rem;
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
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
