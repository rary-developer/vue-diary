<template>
  <div>
    <div>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="userId">id:</label>
          <input id="userId" type="text" v-model="userId" />
          <p class="validation-text">
            <span class="warning" v-if="!userId">
              아이디를 입력해주세요
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          type="submit"
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
export default {
  data(){
    return{
      userId: '',
      password: '',
    }
  },
  methods:{
    
  }
}
</script>

<style>

</style>
