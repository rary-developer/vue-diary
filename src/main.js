import 'bootstrap/dist/css/bootstrap.min.css';
import Vue from 'vue'
import App from './App.vue'
import router from './routes/index';
import store from './store/index';

Vue.config.productionTip = false

//Vue.use(Vuex);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
