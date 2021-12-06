<template>
  <div class="home">
    <Notice :scroll="true"><template slot="noticeTxt">{{noticeTxt}}</template></Notice>
    <!-- banner轮播 -->
    <div class="swiper-container swiper_home">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in banner" :key="index" v-cloak>
          <img :src="item.img" alt="item.introduce" :data-url="item.url" />
          <div class="marsk" v-if="item.introduce" :data-url="item.url">{{item.introduce}}</div>
        </div>
      </div>
    </div>
    <!-- 每日头条 -->
    <div class="headlines">
      <div class="publicTitle"><span>每日头条</span></div>
      <div>
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(item, index) in headlines" :title="item.title" :icon="item.icon" :name="index" :key="index" @click.native="getHotItem(item.interface)">
            <ul class="hotItem">
              <div v-if="headlinesHot.length == 0" style="text-align:center;">
                <van-loading size="24px">加载中...</van-loading>
              </div>
              <div v-else>
                <li class="ub" v-for="(skyItem,skyIndex) in headlinesHot" :key="skyIndex" @click="skip(skyItem.url)">
                  <div class="ub-shrink0">{{skyIndex}}</div>
                  <div class="ub-f1">{{skyItem.title}}</div>
                  <div>
                    <van-icon name="fire-o" color="#ee0a24" />&nbsp;<span>{{skyItem.ups}}</span>
                  </div>
                </li>
              </div>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <!-- 柚头条 -->
    <div class="todayHot">
      <div class="publicTitle"><span>柚头条</span></div>
      <div class="todayHot-toggle ub">
        <div class="ub-shrink0" v-for="(item,index) in youToggle" :key="item.id" :class="{active:youToggleIndex == index}" @click="getPemon(index,item.url)">{{item.txt}}</div>
      </div>
      <div class="ub ub-ver">
        <div v-if="youheadlines.length == 0" style="text-align:center;margin-top:1rem;">
          <van-loading size="24px">加载中...</van-loading>
        </div>
        <div v-else>
          <div class="todayHot-item ub" v-for="(itemYou, indexYou) in youheadlines" :key="indexYou" @click="skip(itemYou.url)">
            <div class="left ub-shrink0 ub ub-ac">
              <img :src="itemYou.img_url" :alt="itemYou.topicName" />
            </div>
            <div class="right ub-shrink0 ub-f1">
              <div class="title">
                <span class="circle">{{ indexYou+1 }}</span><span>{{ itemYou.topicName }}</span>
              </div>
              <div class="txt">{{ itemYou.title }}</div>
              <div class="watch ub-f1 ub ub-ac ub-pe">
                <div class="ub ub-ac">
                  <van-icon name="fire-o" color="#ee0a24" /><span>{{itemYou.ups}}</span>
                </div>
                <div class="ub ub-ac">
                  <van-icon name="chat-o" /><span>{{ itemYou.comments_count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="todayHot">
      <div class="publicTitle publicTitle2"><span>猜你喜欢</span></div>
      <div class="ub ub-ver">
        <div class="todayHot-item ub" v-for="(item, index) in guesslike" :key="index" @click="skip(item.url)">
          <div class="left ub-shrink0">
            <img :src="item.img_url" :alt="item.topicName" />
          </div>
          <div class="right ub-shrink0 ub-f1">
            <div class="title">
              <span>{{ item.topicName }}</span>
            </div>
            <div class="txt">{{ item.title }}</div>
            <div class="watch ub-f1 ub ub-ac ub-pe">
              <div class="ub ub-ac">
                <van-icon name="fire-o" color="#ee0a24" /><span>{{
                  item.ups
                }}</span>
              </div>
              <div class="ub ub-ac">
                <van-icon name="chat-o" /><span>{{ item.comments_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Toast } from 'vant';
import Notice from '../../components/notice/notice';
import publicMethods from '../../utils/publicMethods.js';

export default {
  components: { Notice, },
  data() {
    return {
      noticeTxt: "没服务器没后台没接口，数据接口都是网上随便调的，以后有了再弄。唔吼吼吼……",
      // 轮播图
      banner: [
        {
          url: "https://www.webhek.com/misc-res/species-in-pieces/#",
          img: "https://www.webhek.com/misc-res/species-in-pieces/img/assets/polygon-demo.png",
          introduce: "直接进入30个CSS碎片拼图，30种濒临灭绝动物",
        },
        {
          url: "https://www.agefans.vip/",
          img: "https://img1.baidu.com/it/u=260981461,3886826132&fm=15&fmt=auto",
          introduce: "AGE动漫，值得拥有",
        },
        {
          url: "https://live.bilibili.com/h5",
          img: "https://img2.baidu.com/it/u=441035724,3116485349&fm=26&fmt=auto",
          introduce: "哦超喜欢这里的，里面各个都是人才，说话又好听",
        },
        {
          url: "https://327959167.github.io/MusicPlayer/longjin-MusicAudio/music.html",
          img: "static/image/banner/banner1.jpg",
          introduce: "简易音乐播放器",
        },
      ],
      // 每日头条
      headlines: [
        {
          interface: "/link/hot?afterTime=1636558205018000&_=1636598630447",
          title: "微博",
          icon: "https://www.weibo.com/favicon.ico"
        },
        {
          interface: "/link/news/hottest?afterScore=11172.689210249753&_=1636599885756",
          title: "今日头条",
          icon: "https://www.toutiao.com/favicon.ico"
        },
        {
          interface: "/link/news/latest?afterTime=1636599814043000&_=1636600057386",
          title: "知乎",
          icon: "https://www.zhihu.com/favicon.ico"
        },
        {
          interface: "/link/scoff/hottest?afterScore=11168.805907733333&_=1636600114544",
          title: "百度",
          icon: "https://www.baidu.com/favicon.ico"
        },
        {
          interface: "/link/scoff/latest?afterTime=1636595258044000&_=1636600151976",
          title: "抖音",
          icon:
            "https://img0.baidu.com/it/u=1862947092,1516627745&fm=26&fmt=auto"
        },
        {
          interface: "/link/pic/hottest?afterScore=0&_=1636600177609",
          title: "澎湃",
          icon: "https://www.thepaper.cn/favicon.ico"
        },
        {
          interface: "/link/pic/latest?afterTime=0&_=1636600208132",
          title: "豆瓣",
          icon: "https://www.douban.com/favicon.ico"
        },
        {
          interface: "/link/tec/hottest?afterScore=11169.320485955555&_=1636600245800",
          title: "掘金",
          icon: "https://www.juejin.cn/favicon.ico"
        }
      ],
      activeName: 0,
      headlinesHot: [],
      // 柚头条
      youToggle: [
        {
          id: 0,
          url: "/top/24hr?_=1636598630442",
          txt: "24小时",
        },
        {
          id: 1,
          url: "/top/72hr?_=1636598630443",
          txt: "3天",
        },
        {
          id: 2,
          url: "/top/168hr?_=1636598630444",
          txt: "一周",
        },
      ],
      youToggleIndex: 0,
      youheadlines: [],
      // 猜你喜欢
      guesslike: []
    };
  },
  activated() {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  async mounted() {
    await this.getHotItem(this.headlines[0].interface);
    await this.getPemon(0, this.youToggle[0].url)
    await this.getGuessLike()
    this.swiper_home();
  },
  methods: {
    skip(url) {
      window.location.href = url;
    },
    swiper_home() {
      new Swiper(".swiper_home", {
        loop: true,
        speed: 600,
        observer: true,
        autoplayDisableOnInteraction: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        on: {
          tap: function (event) {
            let url = event.target.getAttribute('data-url');
            if (url != "" && url != null) window.open(url);
          },
        },
      });
    },
    async getHotItem(url) {
      let path = "/apiGas" + url
      if (typeof (this.activeName) == 'number') {
        try {
          let res = await this.$get(path);
          if (res.success && res.code == 200) {
            this.headlinesHot = res.data
          } else {
            Toast({
              message: '每日头条接口请求失败',
              duration: 1500,
              forbidClick: true
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setTimeout(() => {
          this.headlinesHot = [];
        }, 300)

      }
    },
    async getPemon(index, url) {
      this.youheadlines = []
      this.youToggleIndex = index;
      let path = "/apiGas" + url;
      try {
        let res = await this.$get(path);

        if (res.success && res.code == 200) {
          this.youheadlines = res.data
        } else {
          Toast({
            message: '柚头条接口请求失败',
            duration: 1500,
            forbidClick: true
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getGuessLike() {
      let path = "/apiGas/man?afterTime=1636482148402000&_=1636612179653";
      try {
        let res = await this.$get(path);
        if (res.success && res.code == 200) {
          this.guesslike = publicMethods.RandomArray(res.data, 6);
        } else {
          Toast({
            message: '猜你喜欢接口请求失败',
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
/deep/ .headlines .van-cell,
/deep/ .van-collapse-item__content,
/deep/ .van-cell__left-icon {
  font-size: 0.4rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: Microsoft YaHei;
}
/deep/ .headlines .van-cell {
  padding: 0.2rem 0.2rem !important;
}
/deep/ .van-collapse-item__content {
  padding-right: 0px;
}
/deep/ .van-cell__left-icon {
  margin-right: 0.3rem;
}

.home {
  width: 100%;
  font-size: 0.4rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: Microsoft YaHei;
  position: relative;
  background-color: #f5f5f5;

  .swiper-container {
    width: 100%;
    height: 5rem;
    background-color: #ffffff;
    position: relative;
  }
  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
  .swiper_home .marsk {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #ffffff;
    opacity: 0.8;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0rem 0.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .publicTitle {
    width: 100%;
    padding: 0.3rem 0rem;
    box-sizing: border-box;
    margin-bottom: 0.3rem;
    font-size: 0.5rem;
    font-weight: bold;
    border-bottom: 1px dotted rgba(224, 223, 223, 0.5);
    span {
      z-index: 1;
      position: relative;
      &:after {
        position: absolute;
        bottom: 0;
        right: -0.3rem;
        z-index: -1;
        content: " ";
        display: inline-block;
        width: 1.5rem;
        height: 0.2rem;
        background-color: #81ecec;
        border-radius: 0.5rem;
      }
    }
  }
  .publicTitle2 {
    margin-bottom: 0;
    margin-top: 1rem;
  }
  .todayHot {
    width: 96%;
    margin: 0 auto;
    padding: 0rem 0.25rem;
    padding-bottom: 0.6rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
    margin-top: 0.6rem;
    background-color: #ffffff;

    .todayHot-toggle {
      width: 100%;
      overflow-x: auto;
      div {
        min-width: 2rem;
        padding: 0rem 0.25rem;
        box-sizing: border-box;
        height: 0.85rem;
        line-height: 0.85rem;
        text-align: center;
        border: 1px solid lightgray;
        border-radius: 0.1rem;
        margin-right: 0.3rem;
        transition: all 0.3s ease-in-out;
      }
      .active {
        color: #ffffff;
        background-color: #fd79a8;
        border: none;
        font-weight: bold;
      }
    }
    .todayHot-item {
      height: 3.6rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      margin-top: 0.5rem;
      background-color: #ffffff;

      .left {
        width: 2.5rem;
        height: 100%;
        text-align: center;
        margin-right: 0.3rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      .right {
        .title {
          margin-top: 0.1rem;
          .circle {
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            text-align: center;
            line-height: 0.5rem;
            border-radius: 50%;
            background-color: rgb(179, 178, 178);
            color: #ffffff;
            margin-right: 0.2rem;
          }
        }
        .txt {
          width: 100%;
          height: 1.5rem;
          line-height: 0.5rem;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-top: 0.3rem;
          margin-bottom: 0.3rem;
        }
        .watch {
          height: 0.4rem;
          div {
            margin-right: 0.3rem;
            span {
              margin-left: 0.1rem;
            }
          }
        }
      }
    }

    .todayHot-item:nth-of-type(1) .circle {
      background-color: #ff3d00 !important;
    }
    .todayHot-item:nth-of-type(2) .circle {
      background-color: #ff6e00 !important;
    }
    .todayHot-item:nth-of-type(3) .circle {
      background-color: #ffa600 !important;
    }
  }
  .headlines {
    width: 96%;
    margin: 0 auto;
    padding: 0rem 0.25rem;
    padding-bottom: 0.6rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
    margin-top: 0.6rem;
    background-color: #ffffff;
  }
  .hotItem li {
    line-height: 0.6rem;
    padding: 0.3rem 0rem;
    box-sizing: border-box;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }
  .hotItem li:last-of-type {
    border-bottom: none;
  }
  .hotItem li div:nth-of-type(1) {
    width: 6%;
    color: rgba(0, 0, 0, 0.54);
  }
  .hotItem li div:nth-of-type(2) {
    color: #1a1a1a;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .hotItem li div:nth-of-type(3) {
    width: 14%;
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
  }
  .hotItem li:nth-of-type(1) div:nth-of-type(1),
  .hotItem li:nth-of-type(2) div:nth-of-type(1),
  .hotItem li:nth-of-type(3) div:nth-of-type(1) {
    color: #f1403c;
    font-weight: bold;
  }
}
</style>
