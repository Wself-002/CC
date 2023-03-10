<template>
  <div class="page">
    <drag-btn-1 :objInfo="dragInfo1" @dragBtnClick="dragBtnClick(1)"></drag-btn-1>
    <drag-btn-2 :objInfo="dragInfo2" @dragBtnClick="dragBtnClick(2)"></drag-btn-2>
    <drag-btn-3 :objInfo="dragInfo3" @dragBtnClick="dragBtnClick(3)"></drag-btn-3>
    <User v-if="active_menu == 1" :isshow="true"></User>
    <Search :objInfo="objInfo" v-if="active_menu == 1"></Search>
    <InviteData :Height="'90vh'" v-if="active_menu == 2" :isshow="false"></InviteData>
    <Paid :Height="'90vh'" v-if="active_menu == 3" :isshow="false"></Paid>
  </div>
</template>
<script>
import DragBtn1 from '@/components/dragBtn.vue'
import DragBtn2 from '@/components/dragBtn.vue'
import DragBtn3 from '@/components/dragBtn.vue'

import InviteData from '@/components/inviteData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import User from '@/components/promoterUser.vue'
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{DragBtn1,DragBtn2,DragBtn3,InviteData,Paid,Search,User},
  data () {
    return {
      // positonInfo:{
      //   drag1Top:0,
      //   drag1Bottom:false,
      //   drag2Top:0,
      //   drag2Bottom:false,
      //   drag3Top:0,
      //   drag3Bottom:false,
      // },
      dragInfo1:{
        id:1,
        word:'个人资料1',
        top:'60vh',
        isshow:true
      },
      dragInfo2:{
        id:2,
        word:'邀请展示2',
        top:'67vh',
        isshow:false
      },
      dragInfo3:{
        id:3,
        word:'支付展示3',
        top:'74vh',
        isshow:false
      },
      active_menu:1
    };
  },
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  methods: {
    dragBtnClick(data){
      console.log("拖拽",data)
      this.active_menu = data
      for(let i = 1;i < 4 ; i++){
        if(i == data){
          this[`dragInfo${i}`].isshow = true
        }else{
          this[`dragInfo${i}`].isshow = false
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
}
</style>
