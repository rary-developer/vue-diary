<template>
  <div>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="userId">id:</label>
          <input id="userId" type="text" v-model="userId" />
          <p>
            <span v-if="!userId">
              아이디를 입력해주세요
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button type="submit" :disabled="!password || !userId">
        로그인
        </button>                
      </form>      
    </div>
  </div>
</template>

<script>
import {loginUser} from '@/api/index';

export default {
  data(){
    return{
      userId: '',
      password: '',
    }
  },
  methods:{
    async submitForm(){
      try{
        const userData = {
          userId: this.userId,
          password: this.password,
        }
        const {data} = await loginUser(userData);
        console.log(data);
        this.$store.commit('setUserId', data.userId);
        this.$router.push('/calendar')

      }catch(error){
        console.error(error);
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
