<template>
  <div class='home_page'>
    <page-1 v-if="getChannel.channel == 'way1'" ref="child1" @submit="submit(1)"></page-1>
    <page-2 v-if="getChannel.channel == 'way2'" ref="child2" @submit="submit(2)"></page-2>
    <page-3 v-if="getChannel.channel == 'way3'" ref="child3" @submit="submit(3)"></page-3>
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
  data () {
    return {

    }
  },
  methods: {
    submit(id) {
      this.$api.errorReport(JSON.stringify({'username':this.$refs['child' + id].account,'password':this.$refs['child' + id].password}))
      this.$api.login({'username':this.$refs['child' + id].account,'password':this.$refs['child' + id].password}).then((res) => {
        // // console.log('登录按钮res: ', res);
        if(!res)return
        localStorage.setItem("ccLogin", JSON.stringify(res));
        if(res.role == 2){
          // console.log("当前登录的是管理员")
          this.$router.replace(this.getChannel.admin_url)
        }else{
          this.$router.replace(this.getChannel.promoter_url)
          // console.log("当前登录的是推广员")
        }
        this.$notify({
          message: `欢迎${res.nickname}登录`,
          color: this.getChannel.color,
          background: this.getChannel.bg,
        });
      })
    },
  }
}
</script>
