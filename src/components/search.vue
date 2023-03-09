<template>
  <div class="searchbox">
        <van-search
          type="number"
          shape="round"
          v-model="search_value"
          show-action
          placeholder="搜索用户ID"
          @search="onSearch"
          @clear="searchClear"
        >
          <template #action>
            <div :loading="loading" @click="onSearch" class="search_btn" :style="{background:getChannel.bg}">搜索</div>
          </template>
        </van-search>
        <div class="borderbox" v-if="loadingbox"><van-loading type="spinner" :color="getChannel.bg" /></div>
        <div class="borderbox" v-if="objInfo.ishow_searchResult_num != 1 && objInfo.ishow_searchResult_num == 2 && !loadingbox">
          <div class="list add_color">
            <div>ID</div>
            <div>昵称</div>
            <div>注册时间</div>
            <div>会员状态</div>
            <div>会员开通时间</div>
          </div>
          <div class="list add_color no_border">
            <div>{{search_result.id}}</div>
            <div>{{search_result.nickname}}</div>
            <div>{{search_result.regtime | formatDate}}</div>
            <div>{{search_result.paytime == 0 ? '未开通' :'已开通'}}</div>
            <div>{{search_result.paytime | formatDate}}</div>
          </div>
        </div>
        <div class="borderbox" v-if="objInfo.ishow_searchResult_num != 1 && objInfo.ishow_searchResult_num == 3 && !loadingbox">
          暂无此用户
        </div>
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
  data(){
    return{
      search_value:'',
      search_result:{},
      loading:false,
      loadingbox:false
    }
  },
  methods:{
    onSearch(){
      // 搜索接口
        console.log('this.search_value: ', this.search_value);
      if(!this.search_value){
        this.$toast.fail("请输入用户id");
        return
      }
      if(this.loading)return
      this.loading = true
      this.loadingbox = true
      this.$api.userSearch({'text':this.search_value}).then((res) => {
        console.log('res: ', res);
        this.loading = false
        this.objInfo.ishow_searchResult_num = 3
        this.loadingbox = false
        if(!res)return
        this.search_result = res
        this.objInfo.ishow_searchResult_num = 2
      });
    },
    searchClear(){
      this.objInfo.ishow_searchResult_num = 1
    }
  }
}
</script>
<style lang="scss" scoped>
.searchbox{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
  padding: 2.5vw;
  margin: 2vh 0 1vh;
  .van-search{
    padding-left:0 ;
    padding-right:0 ;
  }
  .search_btn{
    padding: 0 30px;
    border-radius: 5vw;
    color: #ffffff;
  }
  .van-search__action{
    padding-right: 0;
  }
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
.borderbox{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 8vh;
  padding: 10px 0;
  // border: 1px solid #ccc;
  // border-style: solid;
  // border-width: 1px;
  border-radius: 2vw;
  box-shadow: 2px 3px 8px #ccc;
  .add_color{
    padding: 0 10px;
    color: #000;
    height: 4vh;
    >div{
      width: 22.5%;
    }
    div:nth-child(1){
      width: 10%;
    }
  }
  .no_border{
    border: none;
  }
}
</style>
