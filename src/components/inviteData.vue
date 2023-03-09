<template>
  <div class="row3">
    <div class="list list_header" :style="{background:getChannel.bg}">
    <div>id</div>
    <div>昵称</div>
    <div>注册时间</div>
    <div>开通会员</div>
    <div>总积分</div>
  </div>
  <van-list error-text="请求失败，点击重新加载" :style="{height:Height}" v-model="objInfo.loading" :finished="objInfo.finished" finished-text="没有更多了" @load="onLoad">
    <div class="list list_content" v-for="item in objInfo.list" :key="item.id">
      <div>{{ item.id }}</div>
      <div>{{ item.nickname | ellipsis }}</div>
      <div>{{ item.regtime | formatDate }}</div>
      <div>{{ item.jifen > 0 ? '是' :'否'}}</div>
      <div>{{ item.jifen }}</div>
    </div>
  </van-list>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters([ "getChannel"]) },
  props: {
    Height: {
      type: String,
      default: '66vh'
    }
  },
  data(){
    return {
      objInfo:{
        latest: "latest",
        list: [],
        loading: false,
        finished: false,
      }
    }
  },
  methods:{
    onLoad() {
      if (this.objInfo.finished) return;
      // 第一页固定传值latest，第N页传上一页最后一条数据的created
      this.$api.listStaff({'latest':this.objInfo.latest,'limit':10}).then((res) => {
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

  }
}
</script>
<style lang="scss" scoped>

.row3 {
  width: 100%;
  padding: 2vh 2.5vw 0;
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
    // height: calc(100vh - 34vh);
    overflow-y: auto;
  }
}
</style>
