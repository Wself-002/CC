<template>
  <div class="page">
    <van-notice-bar :style="{background:getChannel.bg}" color="#fff" background="transparent" left-icon="info-o" scrollable :text="'尊敬的' + loginInfo.nickname + '您已登录'" />
    <van-tabs v-model="active" swipeable>
      <van-tab title="个人信息">
        <User></User>
        <Search :objInfo="objInfo"></Search>
      </van-tab>
      <van-tab title="拉新列表">
        <InviteData :Height="'66vh'"></InviteData>
      </van-tab>
      <van-tab title="待支付列表">
        <Paid :Height="'66vh'"></Paid>
      </van-tab>
    </van-tabs>
    <Time></Time>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Time from '@/components/time.vue'
import InviteData from '@/components/inviteData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import User from '@/components/promoterUser.vue'
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{Time,InviteData,Paid,Search,User},
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  data() {
    return {
      active:0,
      loginInfo:{}
    };
  },
  mounted(){
    this.loginInfo = JSON.parse(localStorage.getItem("ccLogin"))
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  color: #333333;
  header {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
  }
}
.page /deep/ .van-tabs__nav{
  background: transparent;
}
.page /deep/ .van-cell{
  background: transparent;
}
.page /deep/ .van-list__finished-text{
  color: #ffffff;
}
</style>
