import * as types from './mutation-types'
import api from '../api'

export const getUserInfo = ({ dispatch }) => {
  api.getUserInfo().then(res => {
    let _data = res.json()
    if (_data.success) {
      dispatch(types.SET_USER, _data.data)
    } else {
      dispatch(types.SET_USER, {})
    }
  }, res => {
    console.log('login is error')
  })
}

export const setUserInfo = ({ dispatch }, userInfo) => {
  dispatch(types.SET_USER, userInfo)
}

