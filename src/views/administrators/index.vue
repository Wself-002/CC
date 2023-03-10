<template>
  <div class='home_page'>
    <page-1 v-if="getChannel.channel == 'way1' || getChannel.channel == 'way3'" :objInfo="objInfo"></page-1>
    <page-2 v-if="getChannel.channel == 'way2' || getChannel.channel == 'way4'" :objInfo="objInfo"></page-2>
    <page-3 v-if="getChannel.channel == 'way5'" :objInfo="objInfo"></page-3>
  </div>
</template>

<script>
import Page1 from './index1.vue'
import Page2 from './index2.vue'
import Page3 from './index3.vue'
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{Page1,Page2,Page3},
  data(){
    return {
      objInfo:{
        ishow_searchResult_num:1, // 1 没有搜索时不展示结果  2搜索完有数据  3 搜索完无数据
      }
    }
  }
}
</script>
