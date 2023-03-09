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
                maxlength="20"
              />
            </h5>
          </div>
          <div class="row1_row2">
            <div :style="{background:getChannel.bg,color:getChannel.color}">邀请码：{{ objInfo.invitecode }}</div>
            <span class="add_span" @click="openPopup" :style="{background:getChannel.bg,color:getChannel.color}">海报分享</span>
            <span @click="exitFun" :style="{background:getChannel.bg,color:getChannel.color}">退出账号</span>
          </div>
        </div>
      </div>
      <div class="row2" :class="{row_1:getChannel.channel == 'way1'}" :style="{backgroundImage:getChannel.channel == 'way3' ? getChannel.bg :''}">
        <div>
          <h3>{{ objInfo.statObj.jifen }}</h3>
          <p>总积分/点</p>
        </div>
        <div>
          <h3>{{ objInfo.statObj.all }}</h3>
          <p>邀请人数/人</p>
        </div>
        <div>
          <h3>{{ objInfo.statObj.vip }}</h3>
          <p>会员数/人</p>
        </div>
      </div>
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
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{InviteData,Paid,Search},
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
    },
    openPopup(){
      this.$emit('childMethods','openPopup')
    }
  },
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
.row1 {
  width: 100%;
  padding: 0 2.5vw;
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
        font-weight: bold;
        padding: 1vw 2vw;
        font-size: 12px;
        border-radius: 5px;
      }
      span {
        padding: 1vw 2vw;
        border-radius: 5vw;
        font-size: 12px;
      }
      .add_span{
        margin: 0 2vw;
      }
    }
  }
}
.row2 {
  width: 95vw;
  height: auto;
  border-radius: 10px;
  color: #eeeeee;
  padding: 4vh 5vw;
  margin: 2.5vh auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    text-align: center;
    p {
      font-size: 12px;
      font-weight: 400;
      color: #ffffff;
      margin-top: 1vh;
    }
  }
}
.row_1{
  background: url("../../assets/images/bg2.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
