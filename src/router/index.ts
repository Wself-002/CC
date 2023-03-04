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
    path: "/administrator",
    name: "Administrator",
    component: () => import("../views/administrators/index.vue"),
  },
  {
    path: "/promoter",
    name: "Promoter",
    component: () => import("../views/promoter/index.vue"),
  }
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
