const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    // { path: '', redirect: 'name' },
    {
      name: 'name',
      path: 'login',
      component: () => import('pages/Login.vue'),
    },
    {
      path: 'game_player',
      component: () => import('pages/game_player.vue'),
    },
    //game_player_copy
    {
      path: 'game_player_copy',
      component: () => import('pages/game_player_copy.vue'),
    },
  ],
},
  {
    path: '/manager',
    component: () => import('layouts/SubLayout.vue'),
    children: [{
      path: '',
      redirect: 'game',
    },
      {
        path: 'user',
        component: () => import('pages/User.vue'),
      },
      {
        path: 'game',
        component: () => import('pages/Games.vue'),
      },
      {
        path: 'game_host',
        component: () => import('pages/Game_host.vue'),
      },
      //game_host_copy
      {
        path: 'game_host_copy',
        component: () => import('pages/Game_host_copy.vue'),
      },
      {
        path: 'hospital',
        component: () => import('pages/Hospital.vue'),
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
