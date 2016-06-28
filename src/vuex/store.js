import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import appConfig from './modules/appConfig'
import createLogger from 'vuex/logger'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    appConfig
  },
  strict: debug,
  middlewares: debug ? [createLogger()] : []
})
