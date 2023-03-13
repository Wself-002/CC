<template>
  <div class="page">
    <main>
      <div class="box">
        <div class="logo_img">
          <img src="../../assets/images/login_way5.svg" alt="">
        </div>
        <div class="inputBox">
            <input type="text" required="" v-model.trim="objInfo.account">
            <label>请输入用户名</label>
        </div>
        <div class="inputBox">
            <input required="" @keydown.13="submit" v-model.trim="objInfo.password" :type="objInfo.see ? 'text' : 'password'">
            <label>请输入密码</label>
        </div>
        <van-button :color="getChannel.dialog_btn" block round @click.prevent="submit" :loading="objInfo.submitLoading" loading-text="登录中..." :disabled="!objInfo.account || !objInfo.password">
          登录
        </van-button>
      </div>
      <div class="box_">
        <h3>登录流程</h3>
        <van-steps :active="stepActive" :active-color="getChannel.dialog_btn">
          <van-step>输入账号</van-step>
          <van-step>输入密码</van-step>
          <van-step>完成</van-step>
        </van-steps>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    },
    stepActive:{
      type: Number,
      default: '-1'
    },
  },
  computed:{
    ...mapGetters([ "getChannel"]),
  },
  methods: {
    submit() {
      this.$emit('childMethods','submit')
    },
    clickRightIcon() {
      this.$emit('childMethods','clickRightIcon')
    },
  }
};
</script>
<style>
.van-step--horizontal .van-step__circle-container{
  background-color: transparent;
}
.box_ .van-steps[data-v-46663234]{

  background-color: transparent;
}
</style>
<style lang="scss" scoped>
h3{
  color: #fff;
}
.page {
  width: 100vw;
  height: 100vh;
  padding: 15vh 8vw 0;
  background-image: url('../../assets/images/bg.jpg');
  background-size: cover;
  // background: linear-gradient(220.55deg, #565656 0%, #181818 100%);
}
.box {
  width: 100%;
  padding: 5vw;
  background: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0,0.5);
  border-radius: 5vw;
  .inputBox {
    position: relative;
    input {
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      letter-spacing: 1px;
      margin-bottom: 30px;
      border: none;
      border-bottom: 1px solid #fff;
      outline: none;
      background: transparent;
    }
    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      font-size: 16px;
      color: #ffff;
      letter-spacing: 1px;
      pointer-events: none;
      transition: .5s;
    }
  }
}
.logo_img{
  width: 80%;
  margin: 0 auto 5vh;
  img{
    width: 100%;
    object-fit: contain;
  }
}
.box .inputBox input:focus~label,
.box .inputBox input:valid~label {
    top: -18px;
    left: 0;
    color: rgb(255, 215, 0);
    font-size: 12px;
}
.box_{
  position: fixed;
  bottom: 2vh;
  left: 0;
  width: 100%;
  font-weight: bold;
  padding: 0 8vw;
  .van-steps{
    margin-top: 1vh;
  }
}

// .van-step__circle-container{
//   background-color: transparent;
// }
// .van-step--horizontal .van-step__circle-container{
//   background-color: transparent;
// }
// .van-steps[data-v-46663234]{
//   background: transparent;
// }
</style>
