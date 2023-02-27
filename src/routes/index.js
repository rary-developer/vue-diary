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
    {
      path: '/modal',
      component: () => import('@/components/ModalView.vue'),
    },
    {
      path: '/calendar',
      component: () => import('@/views/CalendarView.vue'),
      
    },
    {
      path: '/calendar2',
      component: () => import('@/views/CalendarView2.vue'),      
    },
    {
      path: '/memory',
      component: () => import('@/views/MemoryView.vue'),      
    },
  ]
});