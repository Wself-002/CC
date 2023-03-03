<template>
  <div class="page" :style="{background:getChannel.bg}">
    <header>
      <h2 align="center">您好<br/>欢迎登录</h2>
    </header>
    <main>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/phone.png')" />
        <van-field v-model.trim="account" type="text" placeholder="请输入账号" clearable />
      </div>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/message.png')" />
        <van-field
          v-model.trim="password"
          :type="see ? 'text' : 'password'"
          placeholder="请输入密码"
          clearable
          :right-icon="see ? 'browsing-history' : 'browsing-history-o'"
          @click-right-icon="clickRightIcon" />
      </div>
      <van-button class="" color="rgb(183, 220, 255)" block round @click.prevent="submit" :loading="submitLoading" loading-text="登录中..." :disabled="!account || !password">
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
      account: "",
      password: "",
      see: false,
      submitLoading: false,
    };
  },

  methods: {
    submit() {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
      },3000)
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
	color:#fff;
  font-size: 14px;
}
.van-field__control:internal-autofill-selected{
  background: transparent !important;
}
.page {
  width: 100vw;
  height: 100vh;
  padding: 0 10vw;
  header {
    padding-top: 15vh;
  }
  main {
    padding-top: 5vh;
  }
}
.van-cell{
  background: transparent;
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
</style>
