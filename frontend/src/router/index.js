import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/404',
      component: () => import('@/views/NotFound.vue'),
      hidden: true,
      meta: {
        title: 'Странница не найдена',
        icon: '',
        layout: 'EmptyLayout',
      },
    },
    {
      path: '/',
      redirect: '/games',
      hidden: true,
    },
    {
      path: '/games',
      component: () => import('@/views/Games.vue'),
      meta: {
        title: 'Игры',
        icon: 'controller',
        position: 'left',
      },
    },
    {
      path: '/awards',
      component: () => import('@/views/Games.vue'),
      meta: {
        title: 'Награды',
        icon: 'award',
        position: 'right',
      },
    },

    { path: '*', redirect: '/404', hidden: true },
  ],
});