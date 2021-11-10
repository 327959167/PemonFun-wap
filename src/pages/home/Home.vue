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
          <van-collapse-item v-for="(item, index) in headlines" :title="item.title" :icon="item.icon" :name="index" :key="index" @click.native="unfold(item.id)">
            <ul class="hotItem">
              <li class="ub" v-for="(skyItem,skyIndex) in headlinesHot" :key="skyIndex">
                <div class="ub-shrink0">{{skyIndex}}</div>
                <div class="ub-f1">最高气温{{skyItem.tempMax}}、{{skyItem.moonPhase}}、{{skyItem.windDirDay}}</div>
                <div>
                  <van-icon name="fire-o" color="#ee0a24" />&nbsp;<span>{{skyItem.tempMax}}万</span>
                </div>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <!-- 柚头条 -->
    <div class="todayHot">
      <div class="publicTitle"><span>柚头条</span></div>
      <div class="todayHot-toggle ub ub-pb">
        <div class="ub-shrink0 active">时政要闻</div>
        <div class="ub-shrink0">热搜话题</div>
        <div class="ub-shrink0">饭圈娱乐</div>
        <div class="ub-shrink0">“史”至今日</div>
      </div>
      <div class="ub ub-ver">
        <div class="todayHot-item ub" v-for="(item, index) in youheadlines" :key="index">
          <div class="left ub-shrink0">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="right ub-shrink0 ub-f1">
            <div class="title">
              <span class="circle">{{ item.ranking }}</span><span>{{ item.title }}</span>
            </div>
            <div class="txt">{{ item.txt }}</div>
            <div class="watch ub-f1 ub ub-ac ub-pe">
              <div class="ub ub-ac">
                <van-icon name="fire-o" color="#ee0a24" /><span>{{
                  item.hot
                }}</span>
              </div>
              <div class="ub ub-ac">
                <van-icon name="eye-o" /><span>{{ item.watch }}</span>
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
        <div class="todayHot-item ub" v-for="(item, index) in guesslike" :key="index">
          <div class="left ub-shrink0">
            <img :src="item.img" :alt="item.title" />
          </div>
          <div class="right ub-shrink0 ub-f1">
            <div class="title">
              <span>{{ item.title }}</span>
            </div>
            <div class="txt">{{ item.txt }}</div>
            <div class="watch ub-f1 ub ub-ac ub-pe">
              <div class="ub ub-ac">
                <van-icon name="fire-o" color="#ee0a24" /><span>{{
                  item.hot
                }}</span>
              </div>
              <div class="ub ub-ac">
                <van-icon name="eye-o" /><span>{{ item.watch }}</span>
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

export default {
  components: { Notice, },
  data() {
    return {
      noticeTxt: "没服务器没后台没接口，数据都是随便调的，以后有了再弄。唔吼吼吼……",
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
      // 头条(没接口，调和风api，id为城市)
      headlines: [
        {
          id: "101010100",
          title: "微博",
          icon: "https://www.weibo.com/favicon.ico"
        },
        {
          id: "101210106",
          title: "今日头条",
          icon: "https://www.toutiao.com/favicon.ico"
        },
        {
          id: "101020500",
          title: "知乎",
          icon: "https://www.zhihu.com/favicon.ico"
        },
        {
          id: "101010300",
          title: "百度",
          icon: "https://www.baidu.com/favicon.ico"
        },
        {
          id: "101210102",
          title: "抖音",
          icon:
            "https://img0.baidu.com/it/u=1862947092,1516627745&fm=26&fmt=auto"
        },
        {
          id: "101210111",
          title: "澎湃",
          icon: "https://www.thepaper.cn/favicon.ico"
        },
        {
          id: "101011200",
          title: "豆瓣",
          icon: "https://www.douban.com/favicon.ico"
        },
        {
          id: "101010600",
          title: "掘金",
          icon: "https://www.juejin.cn/favicon.ico"
        }
      ],
      activeName: 0,
      headlinesHot: [],
      keys: "t4aad804bcbe3640be8ec5b6054c680295df55",
      key: "",
      // 柚头条
      youheadlines: [
        {
          title: "花落的声音风知道",
          ranking: "1",
          img:
            "https://img0.baidu.com/it/u=1411444766,613385027&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=543",
          txt:
            "花落的声音风知道，思念的感觉心知道，变冷的温度冬知道，我的祝福你知道，没有华丽的词语，只想在渐冷的冬天为你送上暖暖的祝福！",
          hot: "666",
          watch: "1000+"
        },
        {
          title: "温暖地方名字叫做家",
          ranking: "2",
          img:
            "https://img2.baidu.com/it/u=694712720,3666666249&fm=26&fmt=auto",
          txt:
            "红色的花白色的纱娇羞的面颊，浅浅笑里说出一句愿意的回答，挽你的手在我臂弯越过天涯海角，走进一个温暖地方名字叫做家。  ",
          hot: "555",
          watch: "1000+"
        },
        {
          title: "别忘吃水饺",
          ranking: "3",
          img:
            "https://img1.baidu.com/it/u=3214505320,479566342&fm=26&fmt=auto",
          txt:
            "人生的路途大雪怎能封锁，渴望的目标雾霾何以阻挡，温暖的真情江河不可阻隔，我的关怀短信冬至传送温暖。冬至了，注意保暖防寒进补强身，别忘吃水饺。",
          hot: "888",
          watch: "1000+"
        }
      ],
      // 猜你喜欢
      guesslike: [
        {
          title: "春播一粒“快乐籽”",
          img:
            "https://img1.baidu.com/it/u=2027348420,1537971446&fm=26&fmt=auto",
          txt:
            "春播一粒“快乐籽”，夏长一棵“如意苗”；春撒一滴“吉祥雨”，夏生一丛“幸福草”；春送一份“甜蜜情”，夏赠一份“安康愿”，春末夏初送祝福，愿你岁岁多福禄。",
          hot: "666",
          watch: "1000+"
        },
        {
          title: "总是想：重见“故人”",
          img:
            "https://img1.baidu.com/it/u=205171831,1496452168&fm=26&fmt=auto",
          txt:
            "总是想：重见“故人”，重温“旧梦”，重提“旧事”，重叙“旧情”，虽然这些梦想暂时无法实现，但是发个信息给你，向你“陈情”我的思念，也是一种幸福，祝你安康！微笑是个搬运工，可以随时搬走压力；微笑是个维修工，可以轻松修复哀痛；微笑是个清洁工，可以认真扫除烦忧。",
          hot: "555",
          watch: "1000+"
        },
        {
          title: "朋友，请每天保持微笑",
          img:
            "https://img2.baidu.com/it/u=3218240536,2878022222&fm=26&fmt=auto",
          txt:
            "朋友，请每天保持微笑，成为快乐的保管工，幸福的加油工！上班太烦，工作太乱，领导太粘，生活太酸，怎么办？",
          hot: "888",
          watch: "1000+"
        }
      ]
    };
  },
  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  async mounted() {
    this.getKet();
    await this.getHotItem("101010100", this.key);
    this.swiper_home();
    await this.xx();
  },
  methods: {
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
    getKet() {
      let foo = this.keys.slice(2, this.keys.length - 4);
      this.key = foo;
    },
    async unfold(id) {
      await this.getHotItem(id, this.key);
    },
    async getHotItem(location, key) {
      try {
        let res = await this.$get('https://devapi.qweather.com/v7/weather/3d', { location: location, key: key });
        if (res.code == "200") {
          this.headlinesHot = res.daily;
        } else {
          Toast({
            message: '接口请求失败',
            duration: 1500,
            forbidClick: true
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async xx() {
      try {
        let res = await this.$get('/link/hot?afterTime=1636516805037000&_=1636531282552');
        console.log(res);
        console.log();
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 5rem;
  background-color: #81ecec;
  position: relative;
}
.swiper-button-next,
.swiper-button-prev {
  width: 0.6rem;
  height: 0.6rem;
  background-size: 0.6rem 0.6rem !important;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
/deep/.swiper-pagination-bullet {
  width: 0.2rem !important;
  height: 0.2rem !important;
  border-radius: 50% !important;
  transition: all 0.2s ease-in-out;
  opacity: 0.3;
}
/deep/.swiper-pagination-bullet-active {
  width: 0.4rem !important;
  height: 0.2rem !important;
  background: #74b9ff !important;
  border-radius: 1rem !important;
  opacity: 1;
}

/deep/ .headlines .van-cell {
  padding: 0.2rem 0.2rem !important;
}

/deep/ .van-collapse-item__content {
  padding-right: 0px;
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

.home {
  width: 100%;
  font-size: 0.4rem;
  font-weight: 400;
  position: relative;

  .publicTitle {
    width: 100%;
    padding-bottom: 0.1rem;
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
    width: 100%;
    margin-top: 0.6rem;
    padding: 0rem 0.35rem;
    box-sizing: border-box;
    .todayHot-toggle {
      div {
        padding: 0rem 0.25rem;
        box-sizing: border-box;
        height: 0.75rem;
        line-height: 0.75rem;
        text-align: center;
        border: 1px solid gray;
        border-radius: 0.1rem;
      }
      .active {
        color: #ffffff;
        background-color: #fd79a8;
        border: none;
        font-weight: bold;
      }
    }
    .todayHot-item {
      height: 3.5rem;
      padding: 0.3rem;
      box-sizing: border-box;
      border: 1px solid lightgray;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      margin-top: 0.4rem;

      .left {
        width: 2.5rem;
        height: 100%;
        text-align: center;
        margin-right: 0.3rem;
        img {
          width: 100%;
          height: 100%;
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
            background-color: #d63031;
            color: #ffffff;
            margin-right: 0.2rem;
          }
        }
        .txt {
          width: 100%;
          height: 1.4rem;
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
  }

  .headlines {
    width: 100%;
    margin-top: 0.6rem;
    padding: 0rem 0.35rem;
    box-sizing: border-box;
  }

  .hotItem li div:nth-of-type(1) {
    width: 4%;
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
    margin-bottom: 0.2rem;
  }
  .hotItem li div:nth-of-type(3) {
    width: 18%;
    color: rgba(0, 0, 0, 0.54);
  }
  .hotItem li:nth-of-type(1) div:nth-of-type(1),
  .hotItem li:nth-of-type(2) div:nth-of-type(1),
  .hotItem li:nth-of-type(3) div:nth-of-type(1) {
    color: #f1403c;
  }
}
</style>
