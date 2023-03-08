<template>
  <div class="page">
    <main>
      <div class="row1">
        <div class="avatar">
          <van-image fit="cover" round width="20vw" height="20vw" :src="require('../../assets/images/avatar.png')" />
        </div>
        <div class="row1_row">
          <div>
            <h5>
              昵称：
              <van-field
                v-model.trim="objInfo.nickname"
                :readonly="objInfo.isReadonly"
                :right-icon="objInfo.isReadonly ? require('../../assets/images/edit-icon.png') : require('../../assets/images/right-icon.png')"
                placeholder="请输入昵称"
                @click-right-icon="clickRightIcon"
                maxlength="20" />
            </h5>
          </div>
          <div class="row1_row2">
            <div :style="{background:getChannel.bg,color:getChannel.color}">总积分:{{objInfo.jifen}}</div>
            <span @click="exitFun" :style="{background:getChannel.bg,color:getChannel.color}">退出账号</span>
          </div>
        </div>
      </div>
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
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{PromoterData,Paid,Search},
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
  methods: {
    exitFun(){
      this.$emit('childMethods','exitFun')
    },
    clickRightIcon() {
      this.$emit('childMethods','clickRightIcon')
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
.row1 {
  display: flex;
  align-items: center;
  .avatar {
    margin-right: 2vw;
  }
  .row1_row {
    h5 {
      display: flex;
      align-items: center;
      .van-cell {
        width: 50vw;
      }
    }
    .row1_row2 {
      margin: 1vh 0;
      display: flex;
      align-items: center;
      div {
        padding: 2vw 5vw;
        font-size: 14px;
        margin-right: 5vw;
        border-radius:5px;
      }
      span {
        padding: 2vw 5vw;
        font-size: 12px;
        border-radius: 5vw;
        border: 1px solid #ffffff;
      }
    }
  }
}
</style>
