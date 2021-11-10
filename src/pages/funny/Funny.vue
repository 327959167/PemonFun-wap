<template>
  <div class="funny">柚趣</div>
</template>

<script>
export default {
  created() {
    this.$emit('header', true);
    this.$emit('footer', true);
  },
}
</script>