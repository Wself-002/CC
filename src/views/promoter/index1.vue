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
      <div class="row3">
        <div class="title"><h3>邀请记录</h3></div>
        <div class="list list_header" :style="{background:getChannel.bg}">
          <div>id</div>
          <div>昵称</div>
          <div>注册时间</div>
          <div>开通会员</div>
          <div>总积分</div>
        </div>
        <van-list v-model="objInfo.loading" :finished="objInfo.finished" finished-text="没有更多了" @load="onLoad">
          <div class="list list_content" v-for="item in objInfo.list" :key="item.id">
            <div>{{ item.id }}</div>
            <div>{{ item.nickname | ellipsis }}</div>
            <div>{{ item.regtime }}</div>
            <div>{{ item.jifen > 0 ? '是' :'否'}}</div>
            <div>{{ item.jifen }}</div>
          </div>
        </van-list>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  props: {
    objInfo: {
      type: Object,
      default: function () { return {} }
    }
  },
  methods: {
    exitFun(){
      this.$emit('childMethods','exitFun')
    },
    onLoad() {
      this.$emit('childMethods','onLoad')
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
        padding: 1vw 2vw;
        font-size: 12px;
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
.row3 {
  width: 100%;
  padding: 0 2.5vw;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2vh;
  }
  .list {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 8vh;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    > div {
      width: 25%;
    }
  }
  .list_header {
    border-radius: 8px 8px 0px 0px;
    color: #ffffff;
  }
  .list_content {
    &:nth-child(odd) {
      background: #ffffff;
    }
    &:nth-child(even) {
      background: #f8f8f8;
    }
  }
  .van-list {
    height: calc(100vh - 50vh);
    overflow-y: auto;
  }
}
</style>
