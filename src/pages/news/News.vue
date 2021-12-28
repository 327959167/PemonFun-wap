<template>
  <div class="news">
    <back-top></back-top>
    <div class="toggle ub ub-ac">
      <span v-for="(item,index) in toggle" :key="index" :class="{active:item.flag}" @click="cut(item.txt,item.url)">{{item.txt}}</span>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <ul class="article">
        <li class="ub" v-for="(item,index) in newsList" :key="index">
          <div class="top ub ub-ver ub-f1 ub-pb">
            <div class="txt">{{item.title}}</div>
            <div class="time">{{item.created_time}}</div>
          </div>
          <div class="bottom"><img v-lazy="item.img_url" alt="柚文"></div>
        </li>

      </ul>
      <div style="text-align:center;" v-if="newsList.length != 0">
        <van-button loading-text="加载中..." :loading="loadmore" class="loadMore" @click="onloadMore">加载更多</van-button>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import backTop from '../../components/backTop/backTop.vue';
import { Toast } from 'vant';
export default {
  components: { backTop },
  data() {
    return {
      newsList: [],
      toggle: [
        { txt: "最新热文", flag: true, url: "/apiGas/link/news/hottest", afterScore: null, },
        { txt: "人类发布", flag: false, url: "/apiGas/man", afterTime: null, },
        { txt: "幽默段子", flag: false, url: "/apiGas/link/scoff/hottest", afterScore: null, },
        { txt: "求助问答", flag: false, url: "/apiGas/link/ask/hottest", afterScore: null, },
      ],

      refreshing: false,
      loadmore: false,
    }
  },
  activated() {
    this.$emit('header', true);
    this.$emit('footer', true);
    this.$emit("bottomNavigation", 'news');
  },
  async mounted() {
    await this.getNews(this.toggle[0].url)
  },
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
    async getNews(url) {
      let param, flag = false;
      let infTimestamp = new Date().getTime();
      param = { 'afterScore': 0, '&_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          this.newsList = res.data;
          this.newsList = this.filterTime(this.newsList);
          flag = true;
          return flag;
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
    // 下拉刷新
    async onRefresh() {
      let url;
      this.toggle.forEach((item, index) => {
        item.flag == true ? url = item.url : "";
      })
      let flag = await this.getNews(url);
      if (flag) {
        this.refreshing = false;
        Toast.success("刷新成功！")
      }
      else {
        Toast({
          message: "刷新失败~~",
          duration: 1500,
          forbidClick: true
        });
      }
    },
    onloadMore() {
      this.loadmore = true;
    },
    // 时间格式化
    filterTime(arr) {
      // 时间戳
      var timestamp = new Date().getTime();
      arr.forEach((item, index) => {
        let foo1 = timestamp - (item.created_time / 1000);
        let realy = Math.floor(foo1 / 1000)
        let h = Math.floor(realy / 3600)
        let m = Math.floor(realy % 3600 / 60)
        if (h != 0) {
          var str = `${h}小时${m}分前发布`
        } else {
          var str = `${m}分钟前发布`
        }
        item.created_time = str;
      })
      return arr;
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
      border-bottom: 0.05rem solid #ffffff;
    }
    .active {
      color: #f8aa00;
      font-weight: bold;
      border-bottom: 0.05rem solid #f8aa00;
    }
  }

  .article {
    width: 96%;
    margin: 0 auto;
    margin-top: 0.5rem;
    background-color: #ffffff;
    padding: 0rem 0.3rem;
    box-sizing: border-box;

    li {
      padding: 0.3rem 0rem;
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
      margin-left: 0.3rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-top: 0.08rem;
      }
    }
  }

  .loadMore {
    width: 3rem;
    height: 1rem;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1rem;
    font-weight: bolder;
    text-align: center;
    border-radius: 0.1rem;
    transition: all 0.2s ease-in-out;
    background-color: #f8aa00;
    color: #fff;
  }
}
</style>
