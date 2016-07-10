<template>
    
  <div class="ui-login">
    
    <div class="form-group">
      <label>用户名</label>
      <input type="text" class="form-control" placeholder="您的用户名" v-model="userName" value="{{userName}}">
    </div>
    <div class="form-group">
      <label>密码</label>
      <input type="password" class="form-control" placeholder="您的登录密码" v-model="passWord" @keyup.enter="userDoLogin">
    </div>
    <a href="javascript:void(0);" class="btn btn-success center-block" @click="userDoLogin">登录</a>

  </div>

  <alert
    :show.sync="loginFalse"
    :duration="3000"
    type="danger"
    width="400px"
    placement="top"
    dismissable>
    <strong>登录失败</strong>
    <p>{{loginInfo}}</p>
  </alert>

  <alert
    :show.sync="loginSuccess"
    :duration="3000"
    type="success"
    width="400px"
    placement="top"
    dismissable>
    <strong>登录成功</strong>
    <p>现在页面跳往主页..</p>
  </alert>

</template>
<script>
  import localStore from 'localStore'
  import { alert } from 'vue-strap'
  import api from '../api'
  import { setUserInfo } from '../vuex/actions'

  export default {
    data () {
      return {
        userName: localStore.get('userName'),
        passWord: '',
        loginSuccess: false,
        loginFalse: false,
        loginInfo: ''
      }
    },
    vuex: {
      actions: {
        setUserInfo
      }
    },
    methods: {
      userDoLogin () {
        var self = this
        if (!self.userName || !self.passWord) {
          self.loginInfo = '请输入用户名和登录密码'
          self.loginFalse = true
          return
        }

        api.doLogin({
          userName: self.userName,
          passWord: self.passWord
        }).then(res => {
          let _res = res.json()

          self.loginInfo = _res.message

          if (_res.success) {
            self.loginSuccess = true
            // 登录成功
            // vuex 设置用户状态
            setTimeout(() => {
              localStore.set('userName', _res.data.userName)
              self.setUserInfo(_res.data)
              self.$route.router.go({name: 'main'})
            }, 2000)
          } else {
            // 登录失败
            self.loginFalse = true
          }
        })
      }
    },
    components: {
      alert
    }
  }
</script>
<style>
  .ui-login{ width: 400px; border: 1px solid #ddd; margin: 100px auto; padding: 20px; border-radius: 3px; box-shadow: 3px 3px 40px rgba(0,0,0,.3) }
</style>