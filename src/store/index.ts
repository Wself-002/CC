import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configInfo:{}
  },
  getters:{
    getChannel(state){
      return state.configInfo
    }
  },
  mutations: {
    saveChannel(state, data) {
      state.configInfo = data
    }
  },
});
