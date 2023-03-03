import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "*", redirect: "/login" }, //访问意料之外的路由时重定向到/index
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/administrator1",
    name: "Administrator1",
    component: () => import("../views/administrators/index1.vue"),
  },
  {
    path: "/administrator2",
    name: "Administrator2",
    component: () => import("../views/administrators/index2.vue"),
  },
  {
    path: "/administrator3",
    name: "Administrator3",
    component: () => import("../views/administrators/index3.vue"),
  },
  {
    path: "/promoter1",
    name: "Promoter1",
    component: () => import("../views/promoter/index1.vue"),
  },
  {
    path: "/promoter2",
    name: "Promoter2",
    component: () => import("../views/promoter/index2.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  const loginInfo = JSON.parse(localStorage.getItem("ccLogin") || JSON.stringify({}))
  if(loginInfo){
    next();
  }else{
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
})
export default router;
