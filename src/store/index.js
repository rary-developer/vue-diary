import Vuex from 'vuex';
import Vue from 'vue';
import {
  getUserNoFromLocalStorage,
  getUserIdFromLocalStorage,
  deleteLocalStorage
} from '@/utils/cookies'
import UserSvc from '@/service/UserSvc';

Vue.use(Vuex);

//모듈 나누기
//cookie => localStorage
export default new Vuex.Store({
  state: {
    userId: getUserNoFromLocalStorage() || '',
    userNo: getUserIdFromLocalStorage() || '',
    diaryList: [],
  },
  getters: {
    isLogin(state){
      return state.userNo !== '';
    },
    getUserNo(state){
      return state.userNo;
    },
    getDiaryList(state){
      return state.diaryList;
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
      deleteLocalStorage('userNo','userId');
    },
    setDiaryList(state, data){
      state.diaryList = data;
    }
  },
  actions: {
    async DIARY_DATA({commit}, param){
      this.diaryList = [];
      const {data} = await UserSvc.fetchDiaryList(param);
      commit('setDiaryList',data.data);
      return data;
    }
  },
  
})
