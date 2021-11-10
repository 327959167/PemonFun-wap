<template>
  <div class="login">
    <div class="ub ub-ver ub-ac">
      <h2>柚乐趣</h2>
      <div class="input ub">
        <span class="ub ub-ac ub-pc"><img src="static/image/login/username.png"></span>
        <input class="ub-f1" type="text" placeholder="用户名" v-model.trim="username">
      </div>
      <div class="input ub">
        <span class="ub ub-ac ub-pc"><img src="static/image/login/password.png"></span>
        <input class="ub-f1" type="password" placeholder="密码" v-model.trim="password" ref="password">
        <span class="ub ub-ac ub-pc"><img :src="passwordIcon" @click="toggleShow"></span>
      </div>
      <div class="agree">
        <input type="checkbox" v-model="check">&nbsp;我已仔细阅读并同意<span @click="agree">《王龙金的霸王隐私条款》</span>，并愿意承担由此造成的一切损失。
      </div>
      <div class="submit" @click="submit">登录</div>
      <div class="register"><span @click="register">没有账号，去注册</span></div>
    </div>
  </div>
</template>

<script>
import Storage from '../../utils/storage';

export default {
  data() {
    return {
      isShow: false,
      passwordIcon: "static/image/login/closePassword.png",
      username: "",
      password: "",
      check: "",
      prefix: 'youlequ_login',
      lockr: null,
    }
  },
  created: function () {
    this.$emit('header', false);
    this.$emit('footer', false);
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.password.type = "text";
        this.passwordIcon = "static/image/login/showPassword.png";
      } else {
        this.$refs.password.type = "password";
        this.passwordIcon = "static/image/login/closePassword.png";
      }
    },
    agree() {
      window.location.href = "https://327959167.github.io/MusicPlayer/longjin-MusicAudio/music.html";
    },
    submit() {
      this.lockr = new Storage(this.prefix);
      this.lockr = this.lockr.lockr.default;

      if (this.username.length == 0) {
        this.$toast('用户名未输入');
      } else if (this.password.length == 0) {
        this.$toast('密码未输入');
      } else if (!this.check) {
        this.$toast('隐私协议未勾选');
      } else {
        // 链接数据库，验证用户
        // 这里先跳转首页
        if (this.username == "123" && this.password == "qwe123") {
          this.$store.commit('loginstatus', true)
          this.lockr.set('islogin', true)
          this.$router.push('/home')
        } else {
          this.$store.commit('loginstatus', false)
          this.lockr.set('islogin', false)
          this.$toast("用户名或密码错误！")
        }
      }
    },
    register() {
      this.$router.push('/register');
    },
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  background: url("../../../static/image/login/login.jpg") no-repeat;
  background-size: cover;
  object-fit: fill;
  padding-top: 3rem;
  box-sizing: border-box;

  h2 {
    font-size: 0.8rem;
    color: #ffffff;
    text-shadow: 0 0 0.2rem rgba(254, 254, 70, 0.8);
  }

  .input {
    width: 8rem;
    height: 1.1rem;
    border-radius: 1.1rem;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.6rem;

    input {
      width: 100%;
      height: 100%;
      font-size: 0.4rem;
      font-weight: 400;
      border: 0;
      outline: 0;
      -moz-appearance: textfield;
      padding: 0rem 0.2rem !important;
      box-sizing: border-box !important;
      background: rgba(255, 255, 255, 0) !important;
    }

    span {
      width: 1.1rem;
      height: 100%;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }

  .agree {
    padding: 0px 1rem;
    box-sizing: border-box;
    color: #292929;
    font-size: 0.4rem;
    span {
      color: royalblue;
      text-decoration: underline;
    }
  }

  .submit {
    width: 5.5rem;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    border-radius: 1.1rem;
    font-size: 0.6rem;
    background-color: royalblue;
    box-shadow: 0 0 8px 0px royalblue;
    color: #ffffff;
    margin-top: 0.8rem;
  }

  .register {
    margin-top: 4rem;
    color: #292929;
    font-size: 0.4rem;
    span {
      color: rgb(0, 0, 0);
      text-decoration: underline;
    }
  }
}
</style>