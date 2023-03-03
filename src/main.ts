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
import { Tab, Tabs,Toast, Notify,Dialog, Loading, Button, Icon, Divider, TreeSelect, Field, List, Image as VanImage, Popup, Swipe, SwipeItem, PullRefresh } from "vant";
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
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

Vue.filter("ellipsis", (value: string) => {
  if (!value) return "";
  if (value.length > 5) {
    return value.slice(0, 5) + "...";
  }
  return value;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
