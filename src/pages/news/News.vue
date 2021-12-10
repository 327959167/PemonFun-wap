<template>
  <div class="news">
    新闻页
  </div>
</template>

<script>
export default {
  activated() {
    this.$emit('header', true);
    this.$emit('footer', true);
    this.$emit("bottomNavigation", 'news');
  },
}
</script>
