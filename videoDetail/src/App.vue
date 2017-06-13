<template>
      <router-view></router-view>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss">
@import "./styles/reset.css";
@import "./styles/common.scss";

</style>
