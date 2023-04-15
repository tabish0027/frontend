<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <MainView msg="Welcome to Your Vue.js App"/>
</template>
<script>

import MainView from './components/MainView.vue'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
export default {
  name: 'App',
  components: {
    MainView
  }
}
</script>

<style>
#app {
  margin-top: 0px !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
