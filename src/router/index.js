import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "@/pages/Home";

Vue.use(VueRouter);

export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About'),
      },
      {
        path: '*',
        name: 'NotFound',
        component: () => import('@/pages/404'),
      },
    ]
  })
  return router;
}
