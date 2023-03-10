import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./css/reset.scss"; // 重置基础样式
import api from "./request/api";
import utils from "./utils/utils";
import "babel-polyfill";
import Es6Promise from "es6-promise";
Es6Promise.polyfill();
import { Badge, ActionSheet, Cell,Search, NoticeBar,Step, Steps, Tab, Tabs,Toast, Notify,Dialog, Loading, Button, Icon, Divider, TreeSelect, Field, List, Image as VanImage, Popup, Swipe, SwipeItem, PullRefresh } from "vant";
Vue.use(ActionSheet);
Vue.use(Badge);
Vue.use(Tab);
Vue.use(Cell);
Vue.use(Tabs);
Vue.use(NoticeBar);
Vue.use(Search);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Dialog);
// 将所有 loading Toast 设置为背景不可点击
Toast.setDefaultOptions("loading", { duration: 0, forbidClick: true, message: "" });
Vue.use(Loading);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(TreeSelect);
Vue.use(Field);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(PullRefresh);

Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

import filters from "./utils/filters";
Object.keys(filters).forEach((key) => {
  // @ts-ignore
  Vue.filter(key, filters[key]);
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
