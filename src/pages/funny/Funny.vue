<template>
  <div class="funny">
    <!-- 切换 -->
    <div class="toggle">
      <span :class="{active:toggleShow == 'new'}" @click="toggle('new')">最新</span>
      <span :class="{active:toggleShow == 'hot'}" @click="toggle('hot')">最热</span>
    </div>
    <!-- 瀑布流 -->
    <div class="waterfall ub ub-pb">
      <ul class="waterfall-item ub-shrink0">
        <li class="img">
          <img src="https://img2.baidu.com/it/u=3444299095,3887359279&fm=26&fmt=auto" alt="xx">
          <div class="marsk"></div>
        </li>
        <li class="label"><span>1111111111111111111111111111111111111111111111</span></li>
        <li class="title">确定要申请的专业和院校，根据定的专业院校开始文书写作，确定推荐人，开始成绩认证</li>
        <li class="talk ub">
          <span>
            <van-icon name="fire-o" color="#ee0a24" />&nbsp;8
          </span>
          <span>
            <van-icon name="chat-o" />&nbsp;18
          </span>
        </li>
        <li class="ub">
          <!-- <div><img src="https://img2.baidu.com/it/u=3444299095,3887359279&fm=26&fmt=auto" alt="xx"></div> -->
          <div class="ub ub-ver">
            <span>我看嚓卡斯卡迪那是肯定</span>
            <span>4小时33分钟前发布</span>
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
    }
  },
  methods: {
    toggle(flag) {
      this.toggleShow = flag;
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

    .waterfall-item {
      width: 49%;
      background-color: #fff;
      border-radius: 0.15rem;
      overflow: hidden;
      box-shadow: 0 8px 12px #ebedf0;
      .label,
      .title,
      .talk {
        padding: 0.1rem 0.25rem;
        box-sizing: border-box;
      }
      .img {
        img {
          width: 100%;
        }
      }
      .label {
        width: 100%;
        min-height: 0.4rem;
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
          position: relative;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
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
    }
  }
}
</style>