import Vue from 'vue'
import App from './App.vue'
import { createRouter } from '@/router'
import VueMata from 'vue-meta';

Vue.use(VueMata);

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - Vue SSR'
  }
})

export function createApp () {
  const router = createRouter();
  const app = new Vue({
    router,
    render: h => h(App),
  })
  return { app, router }
}
