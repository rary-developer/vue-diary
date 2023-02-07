<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="userId">id:</label>
          <input id="userId" type="text" v-model="userId" />
          <p class="validation-text">
            <span v-if="!userId" class="warning">
              아이디를 입력해주세요
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <button 
          type="submit" 
          :disabled="!password || !userId" 
          class="btn"
          :class="!userId || !password ? 'disabled' : null"
        >
        로그인
        </button>                
      </form>      
    </div>
  </div>
</template>

<script>
import {saveUserNoToCookie,saveUserIdToCookie} from '@/utils/cookies';
import UserSvc from '@/service/UserSvc';

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
        //const {data} = await loginUser(userData);
        //console.log(data);        
        //this.$router.push('/calendar')
        const response = await UserSvc.signIn(userData);        
        if(response == -1){                    
          alert("아이디 혹은 비밀번호가 잘못됐습니다.");
          return;
        }else if(response.data.code === 200){          
          this.$store.commit('setUserData', response.data);          
          saveUserNoToCookie(response.data.data.userData);
          saveUserIdToCookie(response.data.data.userData);
          this.$router.push('/calendar2')
        }

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
