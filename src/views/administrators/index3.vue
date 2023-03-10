<template>
  <div class="page">
    <drag-btn-1 :objInfo="dragInfo1" @dragBtnClick="dragBtnClick(1)"></drag-btn-1>
    <drag-btn-2 :objInfo="dragInfo2" @dragBtnClick="dragBtnClick(2)"></drag-btn-2>
    <drag-btn-3 :objInfo="dragInfo3" @dragBtnClick="dragBtnClick(3)"></drag-btn-3>
    <User v-if="active_menu == 1" :isshow="true"></User>
    <div class="search_cell" v-if="active_menu == 1">
      <van-cell is-link title="想要搜索某个特定用户?点我试试" @click="actionSheetShow = true" />
      <van-action-sheet v-model="actionSheetShow" title="搜索特定用户">
        <Search :objInfo="objInfo"></Search>
      </van-action-sheet>
    </div>
    <PromoterData :Height="'90vh'" v-if="active_menu == 2" :isshow="false"></PromoterData>
    <Paid :Height="'90vh'" v-if="active_menu == 3" :isshow="false"></Paid>
    <van-divider
      :style="{ color: getChannel.dialog_btn, borderColor: getChannel.dialog_btn, padding: '0 16px' }"
    >End</van-divider>
  </div>
</template>
<script>
import DragBtn1 from '@/components/dragBtn.vue'
import DragBtn2 from '@/components/dragBtn.vue'
import DragBtn3 from '@/components/dragBtn.vue'

import PromoterData from '@/components/promoterData.vue'
import Paid from '@/components/toBePaid.vue'
import Search from '@/components/search.vue'
import User from '@/components/administratorsUser.vue'

import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{DragBtn1,DragBtn2,DragBtn3,PromoterData,Paid,Search,User},
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
.search_cell{
  width: 100vw;
  padding: 0 2vw;
  .van-cell{
    font-style: italic;
  }
  .van-action-sheet{
    height: 60vh;
  }
}
.van-divider{
  position: fixed;
  bottom: 1vh;
  left: 0;
  width: 100vw;
}
</style>
