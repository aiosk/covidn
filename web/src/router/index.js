import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/daily",
    name: "daily",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: () => import(/* webpackChunkName: "ranking" */ "../views/Ranking.vue"),
  },
  {
    path: "/density",
    name: "Density",
    component: () => import(/* webpackChunkName: "density" */ "../views/Density.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
