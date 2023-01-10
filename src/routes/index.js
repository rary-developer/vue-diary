import Vue from 'vue';
import VueRouter from 'vue-router';
//import  CalendarView  from '../views/CalendarView.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignUpPage.vue'),
    },
  ]
});