import Vuex from 'vuex';
import Vue from 'vue';
import userIndex from './modules/user/index';
import calendarIndex from './modules/calendar/index';
import memoryIndex from './modules/memory/index';

Vue.use(Vuex);

//모듈 나누기
//cookie => localStorage
export default new Vuex.Store({
  modules:{
    userIndex,
    calendarIndex,
    memoryIndex
  }


})
