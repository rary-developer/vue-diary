import Vuex from 'vuex';
import Vue from 'vue';
import {
  getUserNoFromCookie,
  getUserIdFromCookie,
  deleteCookie
} from '@/utils/cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: getUserIdFromCookie() ||'',
    userNo: getUserNoFromCookie() || '',
    diaryList: [],
  },
  getters: {
    isLogin(state){
      return state.userNo !== '';
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
      state.userNo = '';
      state.userId = '';
      deleteCookie('userNo','userId');      
    },
    setDiaryList(state, data){
      state.diaryList.push(data);
    }
  },
  actions: {
    
  },
  
})