import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import states from './states';
import getters from './getters';
import mutaions from './mutaions';

Vue.use(Vuex);

export default new Vuex.Store({
  states,
  getters,
  mutaions,
  actions
})