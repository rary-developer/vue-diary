<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="loginId">id: </label>
      <input type="text" id="loginId" v-model="loginId"/>
    </div>
    <div>
      <label for="password">password: </label>
      <input type="text" id="password" v-model="password"/>
    </div>
    <button type="submit">회원가입</button>
    <!-- <p>{{ userNo }}</p> -->
  </form>
</template>

<script>
import {singUpUser} from '@/api/index';

export default {
  data() {
    return {
      loginId: '',
      password: '',
      userNo: '',
    }
  },
  methods:{
    async submitForm() {
      const userData = {
        loginId: this.loginId,
        password: this.password,
      }
      
      const {data} = await singUpUser(userData);
      
      this.userNo = data.userNo;
      this.initForm();
    },
    initForm(){
      this.loginId = '';
      this.password = '';
    }
  }
}
</script>

<style>

</style>