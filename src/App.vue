<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted(){
    this.$utils.judgmentChannel()
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}
</style>
