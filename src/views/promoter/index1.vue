<template>
  <div class="page">
    <main>
      <User></User>
      <Search :objInfo="objInfo"></Search>
      <van-tabs v-model="active" swipeable>
        <van-tab title="邀请数据">
          <InviteData :Height="objInfo.ishow_searchResult_num == 1 ?'38vh' :'28vh'"></InviteData>
        </van-tab>
        <van-tab title="待支付数据">
          <Paid :Height="objInfo.ishow_searchResult_num == 1 ?'38vh' :'28vh'"></Paid>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import InviteData from '@/components/inviteData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import User from '@/components/promoterUser.vue'
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{InviteData,Paid,Search,User},
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  data(){
    return{
      active:0
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  color: #333333;
  // padding: 0 2.5vw;
  header {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
  }
}
</style>
