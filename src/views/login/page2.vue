<template>
  <div class="page" :style="{background:getChannel.bg}">
    <header>
      <div class="logo_img">
        <img src="../../assets/images/lunchuan.svg" alt="">
      </div>
    </header>
    <main>
      <div class="input_row">
        <span class="iconfont">&#xe66c;</span>
        <van-field v-model.trim="objInfo.account" type="text" placeholder="请输入账号" clearable />
      </div>
      <div class="input_row">
        <span class="iconfont">&#xe623;</span>
        <van-field
          v-model.trim="objInfo.password"
          :type="objInfo.see ? 'text' : 'password'"
          placeholder="请输入密码"
          clearable
          :right-icon="objInfo.see ? 'browsing-history' : 'browsing-history-o'"
          @click-right-icon="clickRightIcon" />
      </div>
      <van-button class="" :color="getChannel.dialog_btn" block round @click.prevent="submit" :loading="objInfo.submitLoading" loading-text="登录中..." :disabled="!objInfo.account || !objInfo.password">
        登录
      </van-button>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
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
<style lang="scss" scoped>
.logo_img{
  width: 50vw;
  margin: 0 auto;
  img{
    width: 100%;
    object-fit: contain;
  }
}
.input_row /deep/ .van-field__control::-webkit-input-placeholder {
	color:#6e6e70;
  font-size: 12px;
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
    border-bottom-color: #B7DCFF;
  }
  /deep/ .van-field__control{
    color: #ffffff;
    font-weight: bold;
  }
}
.iconfont{
  color: #fafafb;
}
</style>
