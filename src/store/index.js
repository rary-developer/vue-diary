import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    userNo: '',
  },
  getters: {
    isLogin(state){
      return state.userId !== '';
    },
    getUserNo(state){
      return state.userNo;
    }
  },
  mutations: {
    setUserData(state, data){            
      state.userId = data.data.userData.userId;
      state.userNo = data.data.userData.userNo;
    },
    clearUserData(state){
      state.userId = '';
      state.userNo = '';
    }
  },
  actions: {

  },
  
})