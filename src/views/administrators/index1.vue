<template>
  <div class="page">
    <main>
      <User></User>
      <Search :objInfo="objInfo"></Search>
      <van-tabs v-model="active" swipeable>
        <van-tab title="推广员数据">
          <PromoterData :Height="objInfo.ishow_searchResult_num == 1 ?'53vh' :'42vh'"></PromoterData>
        </van-tab>
        <van-tab title="待支付数据">
          <Paid :Height="objInfo.ishow_searchResult_num == 1 ?'53vh' :'42vh'"></Paid>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import PromoterData from '@/components/promoterData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import User from '@/components/administratorsUser.vue'
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{PromoterData,Paid,Search,User},
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
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  color: #333333;
  padding: 2vw 2.5vw 0;
}
</style>
