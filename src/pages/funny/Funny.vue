<template>
  <div class="funny">
    <!-- 切换 -->
    <div class="toggle">
      <span :class="{active:toggleShow == 'new'}" @click="toggle('new')">最新</span>
      <span :class="{active:toggleShow == 'hot'}" @click="toggle('hot')">最热</span>
    </div>
    <!-- 瀑布流 -->
    <div class="waterfall">
      <ul class="waterfall-item ub-shrink0" ref="waterfallItem" v-for="(item,index) in newest" :key="index" @click="skip(item.url)">
        <li class="img">
          <img v-lazy="item.img_url" :alt="item.title">
          <div class="marsk">{{item.domain}}</div>
        </li>
        <li class="label" v-if="item.topicName"><span>{{item.topicName}}</span></li>
        <li class="title" v-if="item.title">{{item.title}}</li>
        <li class="talk ub">
          <span>
            <van-icon name="fire-o" color="#ee0a24" />&nbsp;{{item.ups}}
          </span>
          <span>
            <van-icon name="chat-o" />&nbsp;{{item.commentsCount}}
          </span>
        </li>
        <li class="ub base">
          <div class="img ub-shrink0 ub ub-ac"><img v-lazy="item.submitted_user.img_url" :alt="item.submitted_user.nick"></div>
          <div class="txt ub-f1 ub ub-ver">
            <span>{{item.submitted_user.nick}}</span>
            <span>{{item.action_time}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  activated() {
    this.$emit('header', true);
    this.$emit('footer', true);
  },
  data() {
    return {
      toggleShow: "new",
      newest: [],
    }
  },
  async mounted() {
    await this.getNewest();
    this.waterFull();
  },
  methods: {
    toggle(flag) {
      this.toggleShow = flag;
    },
    skip(url) {
      window.location.href = url;
    },
    async getNewest() {
      let path = "/apiGas/link/pic/hottest?afterScore=0&_=1637305448330";
      try {
        let res = await this.$get(path);
        if (res.success && res.code == 200) {
          this.newest = res.data;
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
    waterFull() {
      let spacing = 0;
      let divs = this.$refs.waterfallItem;
      let len = divs.length;
      let colWidth = divs[0].offsetWidth;
      let cols = 2;
      let height = new Array(cols);
      height.fill(0);

      for (let i = 0; i < len; i++) {			//循环迭代每一个div，设置定位
        let colIndex = this.min(height);		//调用函数min，获取每一行的数组当中高度最短的下标
        //设置定位
        divs[i].style.top = height[colIndex] + 10 + "px";
        divs[i].style.left = (colIndex + 1) * spacing + colIndex * colWidth + "px";
        //累加列高度
        height[colIndex] += divs[i].offsetHeight + 10;
      }

    },
    min(array) {
      return array.indexOf(Math.min(...array))    //将传递过来的数组当中最小值的下标返回
    },


  },
}
</script>

<style lang="less" scoped>
.funny {
  width: 100%;
  font-size: 0.4rem;
  font-weight: 400;
  color: #1a1a1a;
  font-family: Microsoft YaHei;
  position: relative;
  background-color: #f5f5f5;
  padding-top: 0.2rem;

  .toggle {
    width: 96%;
    margin: 0 auto;
    padding: 0.2rem;
    box-sizing: border-box;
    border-radius: 0.1rem;
    background-color: #fff;
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
    position: relative;

    .waterfall-item {
      width: 48%;
      background-color: #fff;
      border-radius: 0.15rem;
      overflow: hidden;
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
      position: absolute;
      // float: left;
      // margin-bottom: 2%;
      // margin-right: 2%;
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
          width: 70%;
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