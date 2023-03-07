<template>
  <div class='home_page'>
    <page-1 v-if="getChannel.channel == 'way1' || getChannel.channel == 'way3'" :objInfo="objInfo" @childMethods="childMethods"></page-1>
    <page-2 v-if="getChannel.channel == 'way2' || getChannel.channel == 'way4'" :objInfo="objInfo" @childMethods="childMethods"></page-2>
    <page-3  v-if="getChannel.channel == 'way5'"></page-3>
  </div>
</template>

<script>
import Page1 from './page1.vue'
import Page2 from './page2.vue'
import Page3 from './page3.vue'
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  components:{Page1,Page2,Page3},
  data(){
    return{
      objInfo:{
        account: "",
        password: "",
        aid: "",
        see: false,
        submitLoading: false,
      }
    }
  },
  methods: {
    childMethods(data){
      this[data]()
    },
    submit() {
      this.objInfo.submitLoading = true;
      this.$api.errorReport({'username':this.objInfo.account,'password':this.objInfo.password})
      this.$api.login({'username':this.objInfo.account,'password':this.objInfo.password}).then((res) => {
        // // console.log('登录按钮res: ', res);

        this.objInfo.submitLoading = false;
        if(!res)return
        localStorage.setItem("ccLogin", JSON.stringify(res));
        if(res.role == 2){
          // console.log("当前登录的是管理员")
          this.$router.replace('/administrator')
        }else{
          this.$router.replace('/promoter')
          // console.log("当前登录的是推广员")
        }
        this.$notify({
          message: `欢迎${res.nickname}登录`,
          color: this.getChannel.color,
          background: this.getChannel.bg,
          duration:1500
        });
      })
    },
    clickRightIcon() {
      this.objInfo.see = !this.objInfo.see;
    },
  }
}
</script>
