<template>
  <div>
    <div class="row1">
      <div class="avatar">
        <img src="../assets/images/header.svg" alt="" class="headerimg" v-if="getChannel.channel == 'way5'" />
        <van-image fit="cover" round width="20vw" height="20vw" v-else :src="require('../assets/images/avatar.png')" />
      </div>
      <div class="row1_row">
        <div>
          <h5>
            昵称：
            <van-field
              v-model.trim="objInfo.nickname"
              :readonly="objInfo.isReadonly"
              :right-icon="objInfo.isReadonly ? require('../assets/images/edit-icon.png') : require('../assets/images/right-icon.png')"
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
    <div class="row2" :class="{row_1:getChannel.channel == 'way1'}" :style="{backgroundImage:getChannel.channel != 'way1' ? getChannel.bg :''}">
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      objInfo:{
        statObj: { all: 0, vip: 0, jifen: 0 },
        sid: "",
        nickname: "",
        isReadonly: true,
        jifen:0,
        ishow_searchResult_num:1, // 1 没有搜索时不展示结果  2搜索完有数据  3 搜索完无数据
      }
    }
  },
  created() {
    let info = JSON.parse(localStorage.getItem("ccLogin"))
    this.userInfo(info.id);
    this.statStaff();
  },
  methods: {
    exitFun(){
      this.$dialog.confirm({
        title: '确认退出吗?',
        confirmButtonColor:this.getChannel.dialog_btn
      }).then(() => {
        localStorage.removeItem('ccLogin')
        this.$router.replace('/login')
      })
    },
    userInfo(bid) {
      this.$api.userInfo({'bid':bid}).then((res) => {
        this.objInfo.nickname = res.nickname;
        this.objInfo.invitecode = res.invitecode;
        this.swipeList = res.posters
      });
    },
    // 统计信息
    statStaff() {
      this.$api.statStaff().then((res) => {
        this.objInfo.statObj.all = res.users;
        this.objInfo.statObj.vip = res.clubs;
        this.objInfo.statObj.jifen = res.jifen;
      });
    },
    clickRightIcon() {
      if (this.objInfo.isReadonly) {
        this.objInfo.isReadonly = !this.objInfo.isReadonly;
      } else {
        if (!this.objInfo.nickname) return this.$toast("请输入昵称");
        this.$api.userSaveNickname({nickname:this.objInfo.nickname}).then((res) => {
          this.objInfo.isReadonly = false
          this.$toast.success("昵称修改成功");
        });
      }
    },
    openPopup(){
      this.$emit('childMethods','openPopup')
    }
  },
}
</script>
<style lang="scss" scoped>
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
        width: 40vw;
        padding: 1vh 2vw;
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
.row_1{
  background: url("../assets/images/bg2.png") no-repeat center center;
  background-size: 100% 100%;
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
.headerimg{
  width:20vw;
  object-fit: contain;
}
</style>
