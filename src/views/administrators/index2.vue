<template>
  <div class="page">
    <van-notice-bar :style="{background:getChannel.bg}" color="#fff" background="transparent" left-icon="info-o" scrollable :text="'尊敬的' + objInfo.nickname + '您已登录'" />
    <van-tabs v-model="active" swipeable>
      <van-tab title="个人信息">
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
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{PromoterData,Paid,Search,Time},
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    statAdmin(){
      this.$api.statAdmin({'self':''}).then((res) => {
        this.jifen = res.all
      });
    },
    exitFun(){
      this.$emit('childMethods','exitFun')
    },
    onLoad() {
      this.$emit('childMethods','onLoad')
    },
    clickRightIcon() {
      this.$emit('childMethods','clickRightIcon')
    },
  },
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
.row1 {
  display: flex;
  align-items: center;
  margin-top: 5vw;
  width: 100%;
  padding: 0 2.5vw;
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
// .page /deep/ .van-list__finished-text{
//   color: #ffffff;
// }
</style>
