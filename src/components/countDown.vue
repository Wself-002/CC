<template>
  <div class="countDown_class">
    <h3>距离明天({{month}}月{{day}}日 00:00:00)还有:</h3>
    <div class="circle_box">
      <van-circle stroke-width="80" stroke-linecap="square" v-model="currentRate" :speed="100" :rate="currentRate" layer-color='#ccc' size="120px" :color="getChannel.dialog_btn"/>
      <van-count-down :time="time" :style="{color:getChannel.dialog_btn}" />
    </div>
    <h3>健康生活每一天</h3>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["getChannel"]) },
  data(){
    return {
      currentRate:20,
      time: 0,
      month:0,
      day:0
    }
  },
  mounted(){
    const Y = new Date().getFullYear()
    this.month = new Date().getMonth() + 1
    this.day = new Date().getDate() + 1
    this.time = (new Date(`${Y}-${this.month}-${this.day} 00:00:00`).getTime()) -  (new Date().getTime())
    this.currentRate = parseInt((86400 - parseInt(this.time / 1000)) / 86400 * 100)
  }
}
</script>
<style lang="scss" scoped>
.countDown_class{
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: relative;
  .circle_box{
    position: relative;
    // padding: 10px;
    border-radius: 10px;
    margin: 2vh 0;
    .van-count-down{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 18px;
      font-weight: bold;
    }
  }
}
.van-circle{
  animation: rotateAni 5s linear infinite;
}
// 透明度由
@keyframes rotateAni {
  0% {
    transform: rotate(0);
  }
  50%{
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
