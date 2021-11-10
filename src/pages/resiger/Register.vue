<template>
  <div class="resiger ub ub-ver ub-ac">
    <h2>柚乐趣</h2>
    <van-form>
      <van-field class="require" v-model.trim="userMessage.username" label="用户名" ref="username" placeholder="用户名" />
      <van-field class="require" type="password" v-model.trim="userMessage.password" label="密码" ref="password" placeholder="6~16位数数字与字母组合" />
      <van-field class="require" type="password" v-model.trim="userMessage.passwordconfirm" label="确认密码" ref="passwordconfirm" placeholder="确认密码" />
      <van-field readonly clickable name="datetimePicker" :value="userMessage.birthday" label="出生日期" placeholder="生日当天会收到惊喜哦" @click="showPicker = true" />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userMessage.radio" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
            <van-radio name="3">其他</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="uploader" label="头像">
        <template #input>
          <!-- <van-uploader v-model="userMessage.uploader" :max-count="1" :max-size="500 * 1024" /> -->
          <van-uploader v-model="userMessage.uploader" :max-count="1" />
        </template>
      </van-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker v-model="currentDate" type="date" title="出生日期" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
    </van-form>
    <div class="resiger-btn" @click="resiger">注册</div>
  </div>
</template>

<script>
import moment from 'moment';
import jsonschema from 'jsonschema';

export default {
  data() {
    return {
      userMessage: {
        username: "",
        password: "",
        passwordconfirm: "",
        birthday: "",
        radio: '1',
        uploader: [],
      },
      showPicker: false,
      minDate: new Date(1921, 0, 1),
      maxDate: new Date(2059, 12, 31),
      currentDate: new Date(),
    }
  },
  methods: {
    onConfirm() {
      const birthday = moment(this.currentDate).format('YYYY-MM-DD')
      this.userMessage.birthday = birthday;
      this.showPicker = false;
    },

    resiger() {
      let Validator = jsonschema.Validator
      var v = new Validator()
      let obj = {
        username: this.userMessage.username,
        password: this.userMessage.password,
        passwordconfirm: this.userMessage.passwordconfirm,
      }
      var schema = {
        id: "aboutvue",
        type: 'object',
        properties: {
          username: { type: 'string', minLength: 1 },
          password: { type: 'string', pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$' },
          passwordconfirm: { type: 'string', pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$' },
        },
        required: ['username', 'password', 'passwordconfirm',]
      };
      let validateResult = v.validate(obj, schema);
      if (!validateResult.valid) {
        let errors = validateResult.errors.map(item => item.path[0]);
        for (let key in errors) {
          this.$toast(this.$refs[errors[key]].label + "未输入或格式不正确"); return;
        }
      } else {
        if (this.userMessage.password !== this.userMessage.passwordconfirm) {
          this.$toast("确认密码与密码不一致！"); return;
        } else {
          // 这里将用户基本注册信息添加数据库
          // 暂时没有，直接跳转登录页面
          this.$toast.success('注册成功，欢迎加入柚乐趣大家庭');
          this.$router.replace('/login')
          // this.$router.go(-1);
        }
      }
    }

  },
}
</script>

<style lang="less" scoped>
.resiger {
  width: 100%;
  height: 100vh;
  text-align: center;
  padding: 0.5rem;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #9dbdb3, #37b9e9);

  h2 {
    color: #1a1919;
  }

  .resiger-btn {
    width: 5.5rem;
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    border-radius: 1.1rem;
    font-size: 0.6rem;
    background-color: #fdcb6e;
    box-shadow: 0 0 8px 0px #fdcb6e;
    color: #ffffff;
    margin-top: 0.8rem;
  }

  .van-form {
    width: 100%;
    padding: 0.6rem 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.5rem !important;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }

  .require {
    position: relative;
    &::before {
      position: absolute;
      top: 0.4rem;
      left: 0.2rem;
      content: "*";
      font-size: 0.5rem;
      color: red;
    }
  }
}
</style>