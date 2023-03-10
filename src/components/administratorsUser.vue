<template>
  <div class="row1" :class="{row1_padding:isshow}">
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
                maxlength="20" />
            </h5>
          </div>
          <div class="row1_row2">
            <div :style="{background:getChannel.bg,color:getChannel.color}">总积分:{{objInfo.jifen}}</div>
            <span @click="exitFun" :style="{background:getChannel.bg,color:getChannel.color}">退出账号</span>
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
    this.objInfo.sid = info.sid
    this.userInfo(info.id);
    this.statAdmin();
  },
  methods: {
    userInfo(bid) {
      this.$api.userInfo({'bid':bid}).then((res) => {
        this.objInfo.nickname = res.nickname;
      });
    },
    statAdmin(){
      this.$api.statAdmin().then((res) => {
        this.objInfo.jifen = res.all
      });
    },
    exitFun(){
      this.$dialog.confirm({
        title: '确认退出吗?',
        confirmButtonColor:this.getChannel.dialog_btn
      }).then(() => {
        localStorage.removeItem('ccLogin')
        this.$router.replace('/login')
      })
    },
    clickRightIcon() {
      if (this.objInfo.isReadonly) {
        this.objInfo.isReadonly = !this.objInfo.isReadonly;
      } else {
        if (!this.objInfo.nickname) return this.$toast("请输入昵称");
        this.$api.userSaveNickname({nickname:this.objInfo.nickname}).then((res) => {
          this.objInfo.isReadonly = !this.objInfo.isReadonly;
          this.$toast.success("昵称修改成功");
        });
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.row1 {
  width: 100%;
  justify-content: center;
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
.row1_padding{
  padding-top: 2vh;
}
</style>
