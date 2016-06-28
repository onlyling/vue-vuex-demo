'use strict'

import store from './vuex/store'

export default function (router, app) {
  router.map({
    '/': { // 首页
      name: 'home',
      component: function (resolve) {
        require(['./views/index.vue'], resolve)
      }
    },
    '*': {
      component: function (resolve) {
        require(['./views/index.vue'], resolve)
      }
    },
    '/login': { // 主页
      name: 'login',
      component: function (resolve) {
        require(['./views/login.vue'], resolve)
      }
    },
    '/main': { // 主页
      name: 'main',
      component: function (resolve) {
        require(['./views/main.vue'], resolve)
      },
      auth: true
    },
    '/userList': { // 用户列表
      name: 'userList',
      component: function (resolve) {
        require(['./views/userList.vue'], resolve)
      },
      auth: true
    },
    '/productList': { // 主页
      name: 'productList',
      component: function (resolve) {
        require(['./views/productList.vue'], resolve)
      },
      auth: true
    }
  })
  router.beforeEach(({to, next}) => {
    if (to.auth) {
      // setTimeout(() => {
      if (!store.state.user.isLogin) {
        to.router.go({name: 'login'})
      }
      // }, 0)
    }
    next()
  })

  router.start(app, '#app')
}
