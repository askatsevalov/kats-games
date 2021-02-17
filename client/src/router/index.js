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
        title: 'Настольные игры',
        icon: 'chess',
      },
    },
    {
      path: '/games/:id',
      component: () => import('@/views/GameDetails.vue'),
      hidden: true,
    },

    {
      path: '/tictactoe/:roomId',
      component: () => import('@/views/Lobby.vue'),
      props: true,
      hidden: true,
      meta: {
        fullwidth: true,
      },
      children: [
        {
          name: '/tictactoe',
          path: '',
          component: () => import('@/games/TicTacToe.vue'),
          meta: {
            fullwidth: true,
          },
        },
      ],
    },
    {
      path: '/imaginarium/:roomId',
      component: () => import('@/views/Lobby.vue'),
      props: true,
      hidden: true,
      meta: {
        fullwidth: true,
      },
      children: [
        {
          name: '/imaginarium',
          path: '',
          component: () => import('@/games/Imaginarium.vue'),
          meta: {
            fullwidth: true,
          },
        },
      ],
    },

    { path: '*', redirect: '/404', hidden: true },
  ],
});
