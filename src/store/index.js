import Vuex from 'vuex';
import Vue from 'vue';
//import userIndex from './modules/user/index';
//import calendarIndex from './modules/calendar/index';
import UserSvc from '@/service/UserSvc';
import {
  getUserNoFromLocalStorage,
  getUserIdFromLocalStorage, 
  deleteLocalStorage
} from '@/utils/cookies'

Vue.use(Vuex);

//모듈 나누기
//cookie => localStorage
export default new Vuex.Store({
  // modules:{
  //   userIndex,
  //   calendarIndex
  // }

  state:{
    userId: getUserNoFromLocalStorage() || '',
    userNo: getUserIdFromLocalStorage() || '',
    diaryList: [],
  },
  getters:{
    getDiaryList(state){
      return state.diaryList;
    },
    isLogin(state){
      return state.userNo !== '';
    },
    getUserNo(state){
      return state.userNo;
    },
  },
  mutations:{
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
  actions:{
    async DIARY_DATA({commit}, param){
        this.diaryList = [];
        const {data} = await UserSvc.fetchDiaryList(param);
        console.log(data);
        commit('setDiaryList',data.data);
        return data;
    },
  }
})
