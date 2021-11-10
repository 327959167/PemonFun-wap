<template>
  <ul class="notice ub">
    <li class="ub-shrink0">
      <van-icon name="bullhorn-o" />
    </li>
    <li class="ub-f1">基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。2基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。555555555555555</li>
    <li class="ub-shrink0">
      <van-icon name="cross" />
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="less">
.notice {
  width: 100%;
  height: 0.6rem;
  background-color: #ffffff;
  font-size: 0.4rem;
  color: #f1403c;
  font-weight: 400;
  font-family: Microsoft YaHei;
}

.notice li:nth-of-type(1),
.notice li:nth-of-type(3) {
  width: 12%;
  height: 100%;
  line-height: 0.7rem;
  text-align: center;
}

.notice li:nth-of-type(2) {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
}

.notice li:nth-of-type(3) {
  color: #1a1a1a;
}
</style>
  
