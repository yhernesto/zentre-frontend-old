import {createRouter, createWebHistory} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! IMPORTANT
// !!! Dynamic page import is important
// !!! in order to wait until policy is done!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Pages
import Clients from "@/views/clients/Clients.vue";

const history = createWebHistory();

export enum ROUTER_NAME {
  LOGIN = "LOGIN",
  DASHBOARD = "DASHBOARD",
  PAYMENT = "PAYMENT",
  // ANALYTICS = "ANALYTICS",
  // PAYMENT_LINK = "PAYMENT_LINK",
  // REPORTS = "REPORTS",
  CLIENTS = "CLIENTS",
  ORDERS = "ORDERS", 
  MYPAGE = "MYPAGE",
  STATS = "STATS",
  INVENTORY = "INVENTORY",
  PRODUCTS = "PRODUCTS",
  HISTORIC = "HISTORIC",
  CHARTS = "CHARTS",
  CONTENT = "CONTENT",
  // APPEARANCE = "APPEARANCE",
  SETTINGS = "SETTINGS",
  ENTERPRISE = "ENTERPRISE"
}

const routes: Array<RouteRecordRaw> = [
  //public paths
  {
    path: "/login",
    name: ROUTER_NAME.LOGIN,
    component: () => import("@/views/login/Login.vue"),
    meta: {
      icon: "login",
      public: true,
      onlyWhenLoggedOut: true,
      hide: true
    },
  },
  {
    path: "/",
    name: ROUTER_NAME.DASHBOARD,
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: {
      label: "menu-dashboard",
      icon: "home"
    },
  },
  {
    path: "/admin/payment",
    name: ROUTER_NAME.PAYMENT,
    component: () => import("@/views/payment/Payment.vue"),
    meta: {
      label: "menu-payment",
      icon: "payments"
    },
  },
  {
    path: "/admin/content",
    name: ROUTER_NAME.CONTENT,
    component: () => import("@/views/content/Content.vue"),
    meta: {
      label: "menu-content",
      icon: "list"
    },
  },
  {
    path: "/admin/clients",
    name: ROUTER_NAME.CLIENTS,
    component: Clients,
    meta: {
      label: "menu-enterprise-clients",
      icon: "groups",
      hide: false
    },
  },
  {
    path: "/admin/orders",
    name: ROUTER_NAME.ORDERS,
    component: () => import("@/views/orders/Orders.vue"),
    meta: {
      label: "menu-enterprise-orders",
      icon: "list_alt",
      hide: false
    },
  },
  // {
  //   path: "/admin/mypage",
  //   name: ROUTER_NAME.MYPAGE,
  //   component: () => import("@/views/myPage/MyPage.vue"),
  //   meta: {
  //     label: "menu-enterprise-my-page",
  //     icon: "web",
  //     hide: false
  //   },
  // },
  {
    path: "/admin/stats",
    name: ROUTER_NAME.STATS,
    component: () => import("@/views/stats/Stats.vue"),
    meta: {
      label: "menu-enterprise-stats",
      icon: "insights",
      hide: false
    },
  },
  {
    path: "/admin/inventoryprd",
    name: ROUTER_NAME.INVENTORY,
    component: () => import("@/views/inventory/Inventory.vue"),
    meta: {
      label: "menu-enterprise-inventory",
      icon: "inventory_2",
      hide: false
    },
  },
  // {
  //   path: "/admin/productsconfig",
  //   name: ROUTER_NAME.PRODUCTS,
  //   component: () => import("@/views/products/Products.vue"),
  //   meta: {
  //     label: "menu-enterprise-products",
  //     icon: "category",
  //     hide: false
  //   },
  // },
  {
    path: "/admin/historic",
    name: ROUTER_NAME.HISTORIC,
    component: () => import("@/views/historic/Historic.vue"),
    meta: {
      label: "menu-enterprise-historic",
      icon: "query_stats",
      hide: false
    },
  },
  // {
  //   path: "/admin/charts",
  //   name: ROUTER_NAME.CHARTS,
  //   component: () => import("@/views/charts/Charts.vue"),
  //   meta: {
  //     label: "menu-charts",
  //     icon: "query_stats",
  //     hide: false
  //   },
  // },
  // {
  //   path: "/admin/settings",
  //   name: ROUTER_NAME.SETTINGS,
  //   component: () => import("@/views/settings/Settings.vue"),
  //   meta: {
  //     label: "menu-settings",
  //     icon: "settings",
  //     hide: false
  //   },
  // },
  {
    path: "/admin/myenterprise",
    name: ROUTER_NAME.ENTERPRISE,
    component: () => import("@/views/myEnterprise/MyEnterprise.vue"),
    meta: {
      label: "menu-settings-enterprise",
      icon: "business",
      hide: false
    },
  },
];

const router = createRouter({
  history,
  routes,
});

// ******************************************************************
// **** Logout is managed but the apiService,
// **** if it return an unauthorized the page is redirect to Login
// ******************************************************************

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // else next();

//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)

//   // if (!isPublic && !appController.user.getIsAuthenticated()) {
//   //   return next({
//   //     path:'/login',
//   //     query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
//   //   });
//   // }
//   // Do not allow user to visit login page or register page if they are logged in
//   // if (appController.user.getIsAuthenticated() && onlyWhenLoggedOut) {
//   //   return next('/')
//   // }
//   // else
//   next();
// })

export default router;
