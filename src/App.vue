<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted(){
    this.$utils.judgmentChannel()
    const loginInfo = JSON.parse(localStorage.getItem("ccLogin"))
    if(!loginInfo){
      this.$router.replace('/login')
    }
  }
}
</script>
<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   background: transparent;
// }
</style>
