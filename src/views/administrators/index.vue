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
        latest: "latest",
        list: [],
        loading: false,
        finished: false,
        isReadonly: true,
        jifen:0,
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
    onLoad() {
      if (this.objInfo.finished) return;
      // 第一页固定传值latest，第N页传上一页最后一条数据的created
      this.$api.listAdmin({'latest':this.objInfo.latest,'limit':10}).then((res) => {
        // console.log('res: ', res);
        this.objInfo.loading = false;
        if (res.length > 0) {
          this.objInfo.latest = res[res.length - 1].id;
          this.objInfo.list = this.objInfo.list.concat(res); //追加数据
          this.objInfo.finished = false;
        } else {
          this.objInfo.finished = true;
        }
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
