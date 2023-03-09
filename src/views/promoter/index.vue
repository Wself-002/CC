<template>
  <div class='home_page'>
    <page-1 v-if="getChannel.channel == 'way1' || getChannel.channel == 'way3'" ref="child1" :objInfo="objInfo" @childMethods="childMethods"></page-1>
    <page-2 v-if="getChannel.channel == 'way2' || getChannel.channel == 'way4'" ref="child2" :objInfo="objInfo" @childMethods="childMethods"></page-2>
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
  </div>
</template>

<script>
import html2canvas from "html2canvas"; // 保存图片
import Page1 from './index1.vue'
import Page2 from './index2.vue'
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{Page1,Page2},
  data(){
    return {
      objInfo:{
        nickname: "",
        invitecode: "",
        statObj: { all: 0, vip: 0, jifen: 0 },
        isReadonly: true,
        ishow_searchResult_num:1, // 1 没有搜索时不展示结果  2搜索完有数据  3 搜索完无数据
      },
      isShowPopup: false,
      isShowIndicators: true,
      swipeList: [],
      htmlUrl: [],
    }
  },
  created() {
    let info = JSON.parse(localStorage.getItem("ccLogin"))
    this.userInfo(info.id);
    this.statStaff();

  },
  methods: {
    childMethods(data){
      this[data]()
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
