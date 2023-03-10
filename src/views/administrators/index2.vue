<template>
  <div class="page">
    <van-notice-bar :style="{background:getChannel.bg}" color="#fff" background="transparent" left-icon="info-o" scrollable :text="'尊敬的' + loginInfo.nickname + '您已登录'" />
    <van-tabs v-model="active" swipeable>
      <van-tab title="个人信息">
        <User></User>
        <Search :objInfo="objInfo"></Search>
      </van-tab>
      <van-tab title="推广员列表">
        <PromoterData :Height="'68vh'"></PromoterData>
      </van-tab>
      <van-tab title="待支付列表">
        <Paid :Height="'68vh'"></Paid>
      </van-tab>
    </van-tabs>
    <Time></Time>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PromoterData from '@/components/promoterData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import Time from '@/components/time.vue'
import User from '@/components/administratorsUser.vue'
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{PromoterData,Paid,Search,Time,User},
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  data() {
    return {
      active: 0,
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
}
.page /deep/ .van-tabs__nav{
  background: transparent;
}
.page /deep/ .van-cell{
  background: transparent;
}
</style>
