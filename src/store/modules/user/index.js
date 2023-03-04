import state from './states';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,  
}
