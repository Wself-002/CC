<template>
    <div class="one_boxs" :style="{background:getChannel.bg}">
      <div class="onebox">{{ timeObj.Y }}</div>
      <span class="spot">-</span>
      <div class="onebox">{{ timeObj.M }}</div>
      <span class="spot">-</span>
      <div class="onebox">{{ timeObj.D }}</div>
      <span class="spot">&nbsp;&nbsp;</span>
      <div class="onebox">{{ timeObj.h }}</div>
      <span class="spot">:</span>
      <div class="onebox">{{ timeObj.m }}</div>
      <span class="spot">:</span>
      <div class="onebox">{{ timeObj.s }}</div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  data() {
    return {
      timeObj: {},
      timerObj:null,
    };
  },
  created() {
    clearInterval(this.timerObj)
    this.timerObj = setInterval(() => {
      this.timeObj = this.$utils.countDown()
    },1000)
  }
};
</script>

<style lang="scss" scoped>
.one_boxs{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 3vw 0;
  .onebox{
    min-width: 6vw;
    height: 6vw;
    text-align: center;
    font-size: 20px;
  }
  .spot{
    font-size: 18px;
    font-weight: bold;
    margin: 0 5px;
  }
}
</style>
