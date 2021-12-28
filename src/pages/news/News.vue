<template>
  <div class="news">
    <back-top></back-top>
    <div class="toggle ub ub-ac">
      <span v-for="(item,index) in toggle" :key="index" :class="{active:item.flag}" @click="cut(item.txt,item.url)">{{item.txt}}</span>
    </div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div v-if="newsList.length == 0" style="margin-top:1rem;">
        <van-loading color="#0094ff" type="spinner" vertical size="24px">加载中...</van-loading>
      </div>
      <div v-else>
        <ul class="article">
          <li class="ub" v-for="(item,index) in newsList" :key="index">
            <div class="top ub ub-ver ub-f1 ub-pb">
              <div class="txt">{{item.title}}</div>
              <div class="time">{{item.created_time}}</div>
            </div>
            <div class="bottom"><img v-lazy="item.img_url" alt="柚文"></div>
          </li>
        </ul>
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
      toggle: [
        { txt: "最新热文", flag: true, url: "/apiGas/link/news/hottest", afterScore: null, },
        { txt: "人类发布", flag: false, url: "/apiGas/man", afterTime: null, },
        { txt: "幽默段子", flag: false, url: "/apiGas/link/scoff/hottest", afterScore: null, },
        { txt: "求助问答", flag: false, url: "/apiGas/link/ask/hottest", afterScore: null, },
      ],
      newsList: [],
      loading: false,
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
    async cut(txt, url) {
      this.newsList = [];
      this.toggle.forEach((item, index) => {
        item.txt == txt ? item.flag = !item.flag : item.flag = false;
      })
      await this.getNews(url)
    },
    async getNews(url) {
      let param, flag;
      let infTimestamp = new Date().getTime();
      param = { 'afterScore': 0, '&_': infTimestamp, }
      try {
        let res = await this.$get(url, param);
        if (res.success && res.code == 200) {
          this.newsList = res.data
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
    async onRefresh() {
      let url;
      this.toggle.forEach((item, index) => {
        item.flag == true ? url = item.url : "";
      })
      let flag = await this.getNews(url)
      if (flag) {
        this.loading = false;
        Toast.success('刷新成功');
      } else {
        Toast({
          message: "刷新失败",
          duration: 1500,
          forbidClick: true
        });
      }
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
}
</style>
