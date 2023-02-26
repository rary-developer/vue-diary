import Vuex from 'vuex';
import Vue from 'vue';

import states from './states';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  states,
  getters,
  mutations,
  actions,  
})