<template>
  <div class="page">
    <header>
      <h2 align="center">登录一下<br/>查看属于自己的数据~</h2>
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
      <van-button block round @click.prevent="submit" :loading="submitLoading" loading-text="登录中..." :disabled="!account || !password">
        登录
      </van-button>
      {{getChannel.channel}}
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
      aid: "",
      see: false,
      submitLoading: false,
    };
  },

  methods: {
    submit() {
      this.submitLoading = true;
      this.$api.login(`username=${this.account}&password=${this.password}`).then((res) => {
        if (res.code == "000000") {
          this.submitLoading = false;
          localStorage.setItem("sid", res.data.sid);
          // res.data.role//data.role	long	角色：2-管理员；3-推广员
          // aid 49 甜芯 50 附近爱 51 花知 52 小面具
          this.aid = res.data.aid;
          if (res.data.role == 2) {
            if (this.aid) {
              this.$router.push({ path: "/administrator-backstage", query: { aid: this.aid } });
            } else {
              this.$router.push("/administrator-backstage");
            }
          } else {
            if (this.aid) {
              this.$router.push({ path: "/promoters-backstage", query: { aid: this.aid } });
            } else {
              this.$router.push("/promoters-backstage");
            }
          }
        } else {
          this.submitLoading = false;
          this.$toast.fail(res.msg);
        }
      });
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
  background: url("../../assets/bg1.png") no-repeat top center;
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
