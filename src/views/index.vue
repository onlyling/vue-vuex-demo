<template>

  <div class="container ui-welcome">

    <p class="bg-primary">
      欢迎来到 {{appConfig.appName}} ，目前正在建设中，尽情期待...
    </p>

    <p class="bg-success">
      该应用基于 NodeJs、Express、MySQL、Vue
    </p>

    <p class="bg-info">
      初始化咯
    </p>

  </div>

</template>
<script>
  export default {
    vuex: {
      getters: {
        appConfig: state => state.appConfig,
        user: state => state.user
      }
    },
    ready () {
      setTimeout(() => {
        if (this.user.isLogin) {
          this.$route.router.go({name: 'main'})
        } else {
          this.$route.router.go({name: 'login'})
        }
      }, 2000)
    }
  }
</script>
<style>
  .ui-welcome p { line-height: 30px; padding: 15px; }
</style>