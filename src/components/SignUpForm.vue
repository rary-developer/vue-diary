<template>
  <div ckass="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="userId">id: </label>
          <input type="text" id="userId" v-model="userId"/>
        </div>
        <div>
          <label for="password">password: </label>
          <input type="password" id="password" v-model="password"/>
        </div>
        <button 
          type="submit" 
          class="btn"
          :disabled="!userId || !password"
          :class="!userId || !password ? 'disabled' : null"
        >
        회원가입
        </button>
        <!-- <p>{{ userNo }}</p> -->
      </form>  
    </div>  
  </div>  
</template>

<script>
//import {singUpUser} from '@/api/index';
import UserSvc from '@/service/UserSvc'

export default {
  data() {
    return {
      userId: '',
      password: '',
      userNo: '',
    }
  },
  methods:{
    async submitForm() {
      try{
        const userData = {
          userId: this.userId,
          password: this.password,
        }
        const response = await UserSvc.signUp(userData);
        if(response.data.code === 200){
          alert("회원가입이 성공했습니다.");
          this.$router.push({path:"/login"});
        }                
      }
      catch(error){
        console.log(error);
      }finally{
        this.initForm();
      }
    },
    initForm(){
      this.userId = '';
      this.password = '';
    }
  }
}
</script>

<style>

</style>