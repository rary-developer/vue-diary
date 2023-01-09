<template>
  <div>
    <div>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="loginId">id:</label>
          <input id="loginId" type="text" v-model="loginId" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && loginId">
              아이디를 입력해주세요
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
          :class="!isUsernameValid || !password ? 'disabled' : null"
        >
        로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginId: '',
      password: '',
    }
  }
}
</script>

<style>

</style>