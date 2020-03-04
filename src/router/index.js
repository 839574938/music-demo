import Vue from 'vue'
import VueRouter from 'vue-router'

import Recommend from "../views/recommend/recommend";
import Singer from "../views/singer/singer";
import Rank from "../views/rank/rank";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    component: Recommend
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/rank",
    component: Rank
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
