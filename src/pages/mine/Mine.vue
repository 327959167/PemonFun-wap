<template>
  <div class="mine">我的</div>
</template>

<script>
export default {
  name: "funny",
  created() {
    this.$emit('header', false);
    this.$emit('footer', true);
  },
}
</script>