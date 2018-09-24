<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style lang="css">
 @import '../styles/css/bootstrap.css';
 @import '../styles/css/all.min.css';
</style>
