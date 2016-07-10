import Vue from 'vue'
import VueRouter from 'vue-router'
import routerMap from './routers'
import App from './App.vue'

Vue.use(VueRouter)

// 实例化VueRouter
let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

let app = Vue.extend(App)

routerMap(router)

router.start(app, '#app')
