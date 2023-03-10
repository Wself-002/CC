<template>
  <div class="page" :class="{page1:getChannel.channel == 'way1'}">
    <!-- <div class="add_bg" v-if="getChannel.channel == 'way3'" :style="{backgroundImage:getChannel.bg}"></div> -->
    <header>
      <h2>
        您好，<br />
        请登录
      </h2>
    </header>
    <main>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/phone.png')" />
        <van-field autocomplete="off" v-model.trim="objInfo.account" type="text" placeholder="请输入账号" clearable />
      </div>
      <div class="input_row">
        <van-image width="5vw" height="5vw" :src="require('../../assets/images/message.png')" />
        <van-field
          autocomplete="off"
          auto-complete="new-password"
          v-model.trim="objInfo.password"
          :type="objInfo.see ? 'text' : 'password'"
          placeholder="请输入密码"
          clearable
          @keydown.13="submit"
          :right-icon="objInfo.see ? 'browsing-history' : 'browsing-history-o'"
          @click-right-icon="clickRightIcon" />
      </div>
      <van-button :style="{background:getChannel.bg,color:getChannel.color}" block round @click.prevent="submit" @keyup.enter.native="submit" :loading="objInfo.submitLoading" loading-text="登录中..." :disabled="!objInfo.account || !objInfo.password">
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
  header {
    padding-top: 15vh;
  }
  main {
    padding-top: 5vh;
  }
}
.page1{
  background: url("../../assets/images/bg1.png") no-repeat top center;
  background-size: 100% auto;
}
.add_bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 24vh;
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
// .van-button {
//   color: #fff;
//   background: #ff943a;
// }
</style>
