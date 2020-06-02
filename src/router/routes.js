
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/voting', component: () => import('pages/Voting.vue') },
      { path: '/category', component: () => import('pages/Category.vue') },
      { path: '/favourites', component: () => import('pages/Favourites.vue') },

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
