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
                v-model.trim="nickname"
                :readonly="isReadonly"
                :right-icon="isReadonly ? require('../../assets/images/edit-icon.png') : require('../../assets/images/right-icon.png')"
                placeholder="请输入昵称"
                @click-right-icon="clickRightIcon"
                maxlength="20" />
            </h5>
          </div>
          <div class="row1_row2">
            <div :style="{background:getChannel.bg,color:getChannel.color}">总积分:{{jifen}}</div>
            <span @click="exitFun" :style="{background:getChannel.bg,color:getChannel.color}">退出账号</span>
          </div>
        </div>
      </div>
      <div class="row3">
        <div class="title"><h3>推广员</h3></div>
        <div class="list list_header">
          <div>账号</div>
          <div>昵称</div>
          <div>邀请用户数</div>
          <div>充值会员数</div>
          <div>总积分</div>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list list_content" v-for="item in list" :key="item.id">
            <div>{{ item.username }}</div>
            <div>{{ item.nickname | ellipsis }}</div>
            <div>{{ item.users }}</div>
            <div>{{ item.clubs }}</div>
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
  data() {
    return {
      sid: "",
      nickname: "",
      latest: "latest",
      list: [],
      loading: false,
      finished: false,
      isReadonly: true,
      jifen:0,
    };
  },
  created() {
    let info = JSON.parse(localStorage.getItem("ccLogin"))
    this.sid = info.sid
    this.userInfo(info.id);
    this.statAdmin();
  },
  methods: {
    exitFun(){
      this.$dialog.confirm({
        title: '确认退出吗?',
        confirmButtonColor:this.getChannel.bg
      }).then(() => {
        localStorage.removeItem('ccLogin')
        this.$router.replace('/login')
      })
    },
    userInfo(bid) {
      this.$api.userInfo({'bid':bid}).then((res) => {
        this.nickname = res.nickname;
      });
    },
    statAdmin(){
      this.$api.statAdmin({}).then((res) => {
        this.jifen = res.all
      });
    },
    onLoad() {
      if (this.finished) return;
      // 第一页固定传值latest，第N页传上一页最后一条数据的created
      this.$api.listAdmin({'latest':this.latest,'limit':10}).then((res) => {
        // console.log('res: ', res);
        this.loading = false;
        if (res.length > 0) {
          this.latest = res[res.length - 1].id;
          this.list = this.list.concat(res); //追加数据
          this.finished = false;
        } else {
          this.finished = true;
        }
      });
    },
    clickRightIcon() {
      if (this.isReadonly) {
        this.isReadonly = !this.isReadonly;
      } else {
        if (!this.nickname) return this.$toast("请输入昵称");
        this.$api.userSaveNickname(`sid=${this.sid}&nickname=${this.nickname}`).then((res) => {
          if (res.code == "000000") {
            this.isReadonly = !this.isReadonly;
            this.$toast.success("昵称修改成功");
          } else {
            this.$toast.fail(res.msg);
            if (res.code == "800302") {
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            }
          }
        });
      }
    },
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
.row3 {
  margin-top: 2vh;
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
    background: #fff4ea;
    border-radius: 8px 8px 0px 0px;
    color: #666666;
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
    height: calc(100vh - 33vh);
    overflow-y: auto;
  }
}
</style>
