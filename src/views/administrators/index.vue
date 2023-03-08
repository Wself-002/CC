<template>
  <div class='home_page'>
    <page-1 v-if="getChannel.channel == 'way1' || getChannel.channel == 'way3'" ref="child1" :objInfo="objInfo" @childMethods="childMethods"></page-1>
    <page-2 v-if="getChannel.channel == 'way2' || getChannel.channel == 'way4'" ref="child2" :objInfo="objInfo" @childMethods="childMethods"></page-2>
  </div>
</template>

<script>
import Page1 from './index1.vue'
import Page2 from './index2.vue'
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{Page1,Page2},
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
      });
    },
    statAdmin(){
      this.$api.statAdmin().then((res) => {
        this.objInfo.jifen = res.all
      });
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
