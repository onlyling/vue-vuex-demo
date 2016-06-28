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
