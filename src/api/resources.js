import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.root = '/admin'

Vue.http.interceptors.push({
  request (request) {
    // 这里对请求体进行处理
    request.url += ((request.url.indexOf('?') >= 0) ? '&' : '?') + '_time=' + (new Date()).getTime()
    return request
  },
  response (response) {
    // 这里可以对响应的结果进行处理
    return response
  }
})

export const loginResource = Vue.resource('login.json')

export const logoutResource = Vue.resource('logout.json')

export const userResource = Vue.resource('getUserInfo.json')

export const productListResource = Vue.resource('user.json')
