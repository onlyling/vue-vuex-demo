import * as types from './resources'

export default {
  doLogin (data) {
    return types.loginResource.save(data)
  },
  getUserInfo () {
    return types.userResource.save()
  },
  doLogout () {
    return types.logoutResource.save()
  }
}
