import {
  GET_USER,
  SET_USER,
  IS_LOGIN
} from '../mutation-types'
import localStore from 'localStore'

// initial state
const state = {
  userInfo: {},
  isLogin: false
}

// 获取缓存的用户信息
var _upDateTime = +localStore.get('upDateTime') || 0
const _thisTime = (new Date()).getTime()

if ((_thisTime - _upDateTime) < 1000 * 60 * 5) {
  state.userInfo = localStore.get('userInfo')
  state.isLogin = true
}

// mutations
const mutations = {
  [IS_LOGIN] (state) {
    return state.isLogin
  },
  [GET_USER] (state) {
    return state.userInfo
  },
  [SET_USER] (state, userInfo) {
    state.userInfo = userInfo
    if (userInfo.userName) {
      state.isLogin = true
      localStore.set('userInfo', userInfo)
      localStore.set('upDateTime', (new Date()).getTime())
    } else {
      state.isLogin = false
      localStore.clear()
    }
  }
}

export default {
  state,
  mutations
}
