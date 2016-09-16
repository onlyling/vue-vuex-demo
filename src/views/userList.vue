<template>

  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th width="50px">id</th>
          <th>用户名</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in [1,2,3]">
          <td>{{item}}</td>
          <td>{{item}}</td>
        </tr>
      </tbody>

    </table>
  </div>

</template>
<script>
  export default {
    route: {
      data (transition) {
        console.log('1')
      }
    }
  }
</script>