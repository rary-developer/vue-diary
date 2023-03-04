<template>
  <div class="icon-bar">
    <template v-if="isUserLogin">
      <router-link to="/calendar2">
        <i>
          캘린더
        </i>
      </router-link>
      <router-link to="/memory">
        <i>
          메모리
        </i>      
      </router-link>
    </template>
  </div>
</template>

<script>
export default {
  computed:{
    isUserLogin(){
      return this.$store.getters["userIndex/isLogin"];
    },  
  }  
}
</script>

<style>
.icon-bar{
  height: 100%;
  widows: 90px;
  background-color: #555;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 0;
}
.icon-bar a {
  display: block;
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;
  color: white;
  font-size: 24px;
}
.icon-bar a:hover {
  background-color: #858585;
}

.active{
  background-color: #5eaf13;
}
</style>
