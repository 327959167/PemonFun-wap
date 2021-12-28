<template>
  <div class="home">
    <!-- 通知 -->
    <Notice :scroll="true"><template slot="noticeTxt">{{noticeTxt}}</template></Notice>
    <!-- 回到顶部 -->
    <back-top></back-top>
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
      <div class="publicTitle publicTitle2 ub ub-pb"><span>猜你喜欢</span>
        <div class="batch ub ub-ac" @click="batch">换一批&nbsp;
          <svg t="1639361076232" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1410" width="20" height="20" ref="svg">
            <path d="M949.252087 430.532547c-9.240455-7.446599-22.75526-5.965875-30.169113 3.328815l-36.743856 46.075385c-1.208525-17.817808-3.606131-35.751249-7.338129-53.722552C829.114916 204.421786 613.312942 62.124919 393.013537 108.309798 172.691619 154.50798 31.294239 371.70165 77.179288 593.470523c45.88505 221.791385 261.688048 364.101555 482.009965 317.880861 80.081896-16.785292 148.922774-56.816007 202.800869-110.918205 0.199545-0.198521 0.401136-0.355087 0.602727-0.578168 0.956791-0.979304 1.290389-2.113127 2.248204-3.115967 1.578961-2.670829 2.714831-5.855358 2.714831-9.171893 0-9.82067-7.92346-17.790178-17.675568-17.790178-5.254677 0-9.842159 2.405793-13.093203 6.078439l-0.130983-0.11154c-48.916083 49.047066-111.676475 85.202521-184.344518 100.432387-199.506846 41.833781-394.937864-87.050612-436.482049-287.880593-41.566698-200.809515 86.493933-397.531945 285.999756-439.364703 199.506846-41.822524 394.937864 87.073124 436.480003 287.880593 3.207042 15.446807 5.425569 30.855752 6.712889 46.165436l-44.603871-36.034704c-9.262968-7.470135-22.753213-5.966898-30.169113 3.317559-7.435343 9.317203-5.944386 22.898523 3.297093 30.390147 0.045025 0.022513 0.045025 0.022513 0.090051 0.022513l82.132602 66.39006c0.020466 0 0.065492 0.044002 0.086981 0.066515 4.692882 3.793396 10.480702 5.266957 16.016789 4.590552 5.539156-0.555655 10.861372-3.25616 14.617929-7.964392 0.021489-0.021489 0.045025-0.066515 0.045025-0.066515l65.944921-82.71998c0.021489-0.021489 0.021489-0.021489 0.065492-0.045025C959.95894 451.606515 958.492542 438.012915 949.252087 430.532547z" p-id="1411" fill="#707070"></path>
          </svg>
        </div>
      </div>
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
import BackTop from '../../components/backTop/backTop.vue';

export default {
  components: { Notice, BackTop, },
  data() {
    return {
      noticeTxt: "没服务器没后台没接口，数据接口都是网上随便调的，以后有了再弄。唔吼吼吼……",
      // 轮播图
      banner: [
        {
          url: "http://guozhivip.com/lab/",
          img: "https://img0.baidu.com/it/u=1578762854,2915076460&fm=26&fmt=auto",
          introduce: "果汁实验室，发现国内外优质网站",
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
          interface: "/link/hot?afterTime=1638854405038000",
          title: "微博",
          icon: "https://www.weibo.com/favicon.ico"
        },
        {
          interface: "/link/hot?afterTime=1639903834020000",
          title: "今日头条",
          icon: "https://www.toutiao.com/favicon.ico"
        },
        {
          interface: "/man?afterTime=1639107459244000",
          title: "知乎",
          icon: "https://www.zhihu.com/favicon.ico"
        },
        {
          interface: "/link/scoff/hottest?afterScore=11168.805907733333",
          title: "百度",
          icon: "https://www.baidu.com/favicon.ico"
        },
        {
          interface: "/link/scoff/latest?afterTime=1636595258044000",
          title: "抖音",
          icon:
            "https://img0.baidu.com/it/u=1862947092,1516627745&fm=26&fmt=auto"
        },
        {
          interface: "/link/pic/hottest?afterScore=0",
          title: "澎湃",
          icon: "https://www.thepaper.cn/favicon.ico"
        },
        {
          interface: "/link/pic/latest?afterTime=0",
          title: "豆瓣",
          icon: "https://www.douban.com/favicon.ico"
        },
        {
          interface: "/link/tec/hottest?afterScore=11169.320485955555",
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
          url: "/top/24hr",
          txt: "24小时",
        },
        {
          id: 1,
          url: "/top/72hr",
          txt: "3天",
        },
        {
          id: 2,
          url: "/top/168hr",
          txt: "一周",
        },
      ],
      youToggleIndex: 0,
      youheadlines: [],
      // 猜你喜欢
      guesslike: [],
      rotateCount: 0,
    };
  },
  activated() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("bottomNavigation", 'home');
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
      // 获取时间戳
      let timestamp = `&_=${new Date().getTime()}`;
      // &_=1636598630447
      let path = "/apiGas" + url + timestamp;
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
      let timestamp = `?_=${new Date().getTime()}`;
      this.youheadlines = []
      this.youToggleIndex = index;
      let path = "/apiGas" + url + timestamp;
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
      let timestamp = `&_=${new Date().getTime()}`;
      let path = `/apiGas/man?afterTime=1639107459244000${timestamp}`;
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
    async batch() {
      this.rotateCount += 1;
      this.$refs.svg.style.transform = `rotate(${360 * this.rotateCount}deg)`;
      await this.getGuessLike();
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
  min-height: calc(100vh - 3rem);
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
    .batch {
      font-size: 0.4rem;
      svg {
        transition: all 0.3s ease-in-out;
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
