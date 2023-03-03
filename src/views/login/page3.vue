<template>
  <div class="page" :style="{background:getChannel.bg}">
    <header>
      <h2 align="center">登录一下<br/>查看属于自己的数据~</h2>
    </header>
    <main>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/phone.png')" />
        <van-field v-model.trim="account" type="text" placeholder="请输入账号" clearable />
      </div>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/message.png')" />
        <van-field
          v-model.trim="password"
          :type="see ? 'text' : 'password'"
          placeholder="请输入密码"
          clearable
          :right-icon="see ? 'browsing-history' : 'browsing-history-o'"
          @click-right-icon="clickRightIcon" />
      </div>
      <van-button block round @click.prevent="submit" :loading="submitLoading" loading-text="登录中..." :disabled="!account || !password">
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
      account: "test_cps_gly01",
      password: "123456",
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
.page {
  width: 100vw;
  height: 100vh;
  padding: 0 10vw;
  color: #333333;
  header {
    padding-top: 15vh;
  }
  main {
    padding-top: 5vh;
  }
}
.input_row /deep/ .van-field__control::-webkit-input-placeholder {
	color:#6e6e70;
  font-size: 12px;
}
.van-field__control:internal-autofill-selected{
  background: transparent !important;
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
.van-cell{
  background: transparent;
}
.van-button {
  color: #fff;
  background: #ff943a;
}
</style>
