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
