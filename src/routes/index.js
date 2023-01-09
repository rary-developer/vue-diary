import Vue from 'vue';
import VueRouter from 'vue-router';
import  CalendarView  from '../views/CalendarView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CalendarView,

    }
  ]
});