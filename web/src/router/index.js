import Vue from "vue";
import VueRouter from "vue-router";
import Daily from "../views/Daily.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Daily,
  },
  {
    path: "/daily",
    name: "Daily",
    component: Daily,
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: () => import(/* webpackChunkName: "ranking" */ "../views/Ranking.vue"),
  },
  {
    path: "/ratio",
    name: "Ratio",
    component: () => import(/* webpackChunkName: "ratio" */ "../views/Ratio.vue"),
  },
  {
    path: "/ratio-population",
    name: "RatioPopulation",
    component: () => import(/* webpackChunkName: "ratio-population" */ "../views/RatioPopulation.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
