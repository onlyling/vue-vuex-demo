<template>

  <div class="ui-body" v-bind:class="{'ui-full-screen': userInfo.userName ? (showMenu ? false : true) : true}">

    <nav class="navbar navbar-inverse ui-navbar" id="fnNavBar">

      <div class="container clearfix">

        <ul class="nav navbar-nav">

          <li v-show="userInfo.userName"><a href="javascript:void(0);" class="pull-right glyphicon" v-bind:class="{'glyphicon-list': !showMenu, 'glyphicon-stop': showMenu}" @click="toggleMenu()"></a></li>

          <li v-show="userInfo.userName"><a href="javascript:void(0);">您好，{{userInfo.userName}} 管理员</a></li>

          <li><a href="javascript:void(0);">{{nowTime}}</a></li>

        </ul>

        <ul class="nav navbar-nav  pull-right">

          <li v-show="userInfo.userName"><a href="javascritp:void(0);" class="btn btn-link" @click="doLogout">退出登录</a></li>

        </ul>

      </div>

    </nav>

    <div class="ui-body">
      
      <div class="ui-sidebar bg-primary" v-bind:style="{'height': sidebarHeight+'px'}">

        <h3 class="ui-sidebar-nav-title" id="fnSidebarTitle">导航栏</h3>

        <ul class="ui-sidebar-nav-list" v-bind:style="{'height': sidebarUlHeight+'px'}">

          <li v-for="item in navUrl">

            <p><span class="glyphicon glyphicon-{{item.icon}}"></span>{{item.text}}</p>

            <ul>
              <li v-for="subitem in item.subUrl">
                <a v-link="{name: subitem.name}">{{subitem.text}}</a>
              </li>
            </ul>

          </li>

        </ul>

      </div>

      <div class="ui-main">

        <div class="ui-main-in">
          <router-view></router-view>
        </div>

      </div>

    </div>

  </div>
  
</template>

<script>
  import store from './vuex/store'
  import localStore from 'localStore'
  import { getUserInfo, setUserInfo } from './vuex/actions'
  import api from './api'

  export default {
    store,
    vuex: {
      getters: {
        userInfo: state => state.user.userInfo
      },
      actions: {
        getUserInfo,
        setUserInfo
      }
    },
    data () {
      return {
        nowTime: '',
        showMenu: true,
        sidebarHeight: 0,
        sidebarUlHeight: 0,
        navUrl: [{
          icon: 'home',
          text: '管理中心',
          subUrl: [{
            text: '后台主页',
            name: 'main'
          }]
        }, {
          icon: 'user',
          text: '用户管理',
          subUrl: [{
            text: '用户列表',
            name: 'userList'
          }]
        }, {
          icon: 'tag',
          text: '商品管理',
          subUrl: [{
            text: '商品列表',
            name: 'productList'
          }]
        }]
      }
    },
    created () {
      if (localStore.get('userName')) {
        this.getUserInfo()
      }
    },
    ready () {
      var self = this
      // 当前时间
      setInterval(function () {
        self.nowTime = self.timeFilter(new Date())
      }, 1000)

      // 设置导航的高
      let fnNavBarH = document.getElementById('fnNavBar').clientHeight
      let fnSidebarTitleH = document.getElementById('fnSidebarTitle').clientHeight

      self.sidebarHeight = window.innerHeight - fnNavBarH
      self.sidebarUlHeight = self.sidebarHeight - fnSidebarTitleH
      window.addEventListener('resize', function () {
        self.sidebarHeight = window.innerHeight - fnSidebarTitleH
        self.sidebarUlHeight = self.sidebarHeight - fnSidebarTitleH
      }, false)
    },
    methods: {
      timeFilter (timestamp) {
        let _time = timestamp.getFullYear() + '-'
        _time += (timestamp.getMonth() + 1) + '-'
        _time += timestamp.getDate() + ' '
        _time += timestamp.getHours() + ':'
        _time += timestamp.getMinutes() + ':'
        _time += timestamp.getSeconds()
        return _time
      },
      toggleMenu () {
        this.showMenu = !this.showMenu
      },
      doLogout () {
        let self = this
        api.doLogout().then(res => {
          let _res = res.data
          if (_res.success) {
            self.setUserInfo({})
            localStore.remove('userName')
            setTimeout(() => {
              self.$route.router.go({name: 'login'})
            }, 1000)
          }
        })
      }
    }
  }
</script>
<style>
  .ui-navbar{ border-radius: 0; margin-bottom: 0;}

  .ui-sidebar { float: left; width: 200px; box-shadow: 2px 0 4px rgba(0,0,0,.4); overflow: hidden;transition: all 1s;}
  .ui-sidebar a{ display: block; color: #fff; }
  .ui-sidebar ul{ list-style: none; padding: 0; line-height: 30px; }
  .ui-sidebar li{ padding-left: 40px;}
  .ui-sidebar-nav-title{ margin: 0; padding: 10px; }
  .ui-sidebar-nav-list { overflow-y: auto; }
  .ui-sidebar-nav-list > li{ padding-left: 0; }
  .ui-sidebar-nav-list > li p{ padding-left: 20px; line-height: 40px; margin-bottom: 0; background-color: #053359; }
  .ui-sidebar-nav-list > li.active > p{ background-color: #f60; }
  .ui-sidebar-nav-list > li li:hover{ background-color: #5095CE; }
  .ui-sidebar-nav-list > li.active li.active{ background-color: #296190; }
  .ui-sidebar-nav-list .glyphicon{ margin-right: 5px; }

  .ui-main { width: 100%;}
  .ui-main-in { padding-left: 220px; transition: all 1s; padding-top: 20px; }

  /*全屏*/
  .ui-full-screen .ui-sidebar{ margin-left: -205px; }
  .ui-full-screen .ui-main-in{ padding-left: 0; }
</style>
