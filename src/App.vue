<template>
  <div id="app">
    <side-bar></side-bar>
    <div id="nav">
      <router-link to="/calendar2"></router-link>
      <router-link to="/memory"></router-link>
    </div>    
    <AppHeader></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import SideBar from './views/SideBarView.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    SideBar,
  }
}
</script>

<style>
@import './css/common.css';
</style>
