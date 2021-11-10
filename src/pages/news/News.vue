<template>
  <div class="news">
    新闻页
  </div>
</template>

<script>
export default {
  created() {
    this.$emit('header', true);
    this.$emit('footer', true);
  },
}
</script>
