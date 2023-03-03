<template>
  <div class="page">
    <header>
      <h2>
        您好，<br />
        请登录
      </h2>
    </header>
    <main>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/phone.png')" />
        <van-field autocomplete="off" v-model.trim="account" type="text" placeholder="请输入账号" clearable />
      </div>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/message.png')" />
        <van-field
          autocomplete="off"
          auto-complete="new-password"
          v-model.trim="password"
          :type="see ? 'text' : 'password'"
          placeholder="请输入密码"
          clearable
          :right-icon="see ? 'browsing-history' : 'browsing-history-o'"
          @click-right-icon="clickRightIcon" />
      </div>
      <van-button block round @click.prevent="submit" @keyup.enter.native="submit" :loading="submitLoading" loading-text="登录中..." :disabled="!account || !password">
        登录
      </van-button>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  data() {
    return {
      account: "test_cps_gly01", // test_cps_gly01  // test_cps_tgy01
      password: "",
      aid: "",
      see: false,
      submitLoading: false,
    };
  },

  methods: {
    submit() {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
      },1500)
      this.$emit('submit')
    },
    clickRightIcon() {
      this.see = !this.see;
    },
  }
};
</script>
<style lang="scss" scoped>
.input_row /deep/ .van-field__control::-webkit-input-placeholder {
	color:#ccc;
  font-size: 14px;
}
.van-field__control:-webkit-autofill {
  background: transparent !important;
}
.page {
  width: 100vw;
  height: 100vh;
  padding: 0 10vw;
  color: #333333;
  background: url("../../assets/images/bg1.png") no-repeat top center;
  background-size: 100% auto;
  header {
    padding-top: 15vh;
  }
  main {
    padding-top: 5vh;
  }
}
.input_row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 3vh;
  &:active {
    border-bottom-color: #ff943a;
  }
}
.van-button {
  color: #fff;
  background: #ff943a;
}
</style>
