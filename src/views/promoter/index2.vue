<template>
  <div class="page" :style="{background:getChannel.bg}">
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
                  v-model.trim="nickname"
                  :readonly="isReadonly"
                  :right-icon="isReadonly ? require('../../assets/images/edit-icon.png') : require('../../assets/images/right-icon.png')"
                  placeholder="请输入昵称"
                  @click-right-icon="clickRightIcon"
                  maxlength="20"
                />
              </h5>
            </div>
            <div class="row1_row2">
              <div>邀请码：{{ invitecode }}</div>
              <span class="add_span" @click="openPopup" :style="{background:getChannel.bg,color:getChannel.color}">海报分享</span>
              <span @click="exitFun" :style="{background:getChannel.bg,color:getChannel.color}">退出账号</span>
            </div>
          </div>
        </div>
        <div class="row2">
          <div>
            <h3>{{ statObj.jifen }}</h3>
            <p>总积分/点</p>
          </div>
          <div>
            <h3>{{ statObj.all }}</h3>
            <p>邀请人数/人</p>
          </div>
          <div>
            <h3>{{ statObj.vip }}</h3>
            <p>会员数/人</p>
          </div>
        </div>
      </van-tab>
      <van-tab title="数据">
        <div class="row3">
          <div class="title"><h3>邀请记录</h3></div>
          <div class="list list_header">
            <div>昵称</div>
            <div>注册时间</div>
            <div>积分</div>
          </div>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="list list_content" v-for="item in list" :key="item.id">
              <div>{{ item.nickname | ellipsis }}</div>
              <div>{{ item.nickname }}</div>
              <div>{{ item.jifen }}</div>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <main>

      <van-popup v-model="isShowPopup" position="bottom">
        <div class="popup">
          <div class="box">
            <div class="posters">
              <div class="dom_list" ref="domlist">
                <div
                  v-for="(image, index) in swipeList"
                  :key="index"
                  :style="{
                    backgroundImage: 'url(' + image + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: '100% 100%',
                  }"
                >
                </div>
              </div>
              <van-swipe class="img_list" indicator-color="white" :show-indicators="isShowIndicators">
                <van-swipe-item v-for="(image, index) in htmlUrl" :key="index">
                  <img :src="image" alt="" />
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="btn btn2" :style="{background:getChannel.bg,color:getChannel.color}">长按图片保存至相册</div>
            <div class="btn btn2" @click="closePopup">取消</div>
          </div>
        </div>
      </van-popup>
    </main>
  </div>
</template>
<script>
import html2canvas from "html2canvas"; // 保存图片
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  data() {
    return {
      active:0,
      nickname: "",
      invitecode: "",
      statObj: { all: 0, vip: 0, jifen: 0 },
      latest: "latest",
      list: [],
      loading: false,
      finished: false,
      isShowPopup: false,
      isReadonly: true,
      isShowIndicators: true,
      swipeList: [],
      htmlUrl: [],
    };
  },
  created() {
    let info = JSON.parse(localStorage.getItem("ccLogin"))
    this.sid = info.sid
    this.userInfo(info.id);
    this.statStaff();
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
        console.log('当前用户信息res: ', res);
        this.nickname = res.nickname;
        this.invitecode = res.invitecode;
        this.swipeList = res.posters
      });
    },
    // 统计信息
    statStaff() {
      this.$api.statStaff().then((res) => {
        this.statObj.all = res.users;
        this.statObj.vip = res.clubs;
        this.statObj.jifen = res.jifen;
      });
    },
    onLoad() {
      if (this.finished) return;
      // 第一页固定传值latest，第N页传上一页最后一条数据的created
      this.$api.listStaff({'latest':this.latest,'limit':10}).then((res) => {
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

    openPopup() {
      this.isShowPopup = true;
      this.$toast.loading({ message: "海报生成中...", forbidClick: true });
      setTimeout(() => {
        this.htmlUrl = [];
        this.isShowIndicators = true;
        const domlist = Array.from(this.$refs.domlist.children);
        domlist.forEach((element) => {
          html2canvas(element, {
            backgroundColor: "transparent",
            useCORS: true,
            scale: 1, // 三倍放大处理模糊问题
          })
            .then((canvas) => {
              let image = canvas.toDataURL("image/jpeg"); //此时就得到了dom元素转成了base64的图片
              this.htmlUrl.push(image);
              if (domlist.length == this.htmlUrl.length) this.$toast.clear();
            })
            .catch(() => {
              this.$toast.clear();
            });
        });
      }, 100);
    },
    closePopup() {
      this.isShowPopup = false;
    },
    errorReport(data) {
      this.$api.errorReport(data).then(() => {
        // console.log("异常上报", res);
      });
    },

    clickRightIcon() {
      if (this.isReadonly) {
        this.isReadonly = !this.isReadonly;
      } else {
        // if (!this.nickname) return this.$toast("请输入昵称");
        // this.$api.userSaveNickname(`sid=${this.sid}&nickname=${this.nickname}`).then((res) => {
        //   if (res.code == "000000") {
        //     this.isReadonly = !this.isReadonly;
        //     this.$toast.success("昵称修改成功");
        //   }
        // });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  color: #333333;
  padding: 0 2.5vw;
  header {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
  }
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
        font-weight: bold;
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
  width: 100%;
  height: auto;
  color: #eeeeee;
  padding: 4vh 5vw;
  margin: 2.5vh 0;
  background: #7aa8f8;
  border-radius: 20px;
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
.row3 {
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
    background: #262a2e;
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
    height: calc(100vh - 25vh);
    overflow-y: auto;
  }
}
.van-popup {
  overflow-y: inherit;
}
.popup {
  position: relative;
  width: 100%;
  height: 30vh;
  .box {
    width: 80vw;
    position: absolute;
    bottom: 5vw;
    left: 0;
    right: 0;
    margin: 0 auto;
    .posters {
      width: 100%;
      height: calc(80vw * 1.8);
      position: relative;
      .dom_list {
        width: calc(100% * 3);
        height: calc(100% * 3);
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        > div {
          width: 100%;
          height: 100%;
          border-radius: 3vw;
          overflow: hidden;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .van-loading {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      .img_list {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        img {
          width: 100%;
          height: 100%;
          border-radius: 3vw;
        }
      }
    }
    .btn {
      width: 100%;
      height: 5vh;
      line-height: 5vh;
      border-radius: 5vw;
      margin: 1vh 0;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }
    .btn1 {
      background: #ff943a;
      color: #ffffff;
    }
    .btn2 {
      color: #999999;
    }
  }
}
</style>
