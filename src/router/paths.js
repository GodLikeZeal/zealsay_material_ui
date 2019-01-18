export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },  
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/NotFound.vue`
    )
  },
  {
    path: '/403',
    meta: {
      public: true,
    },
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/Deny.vue`
    )
  },
  {
    path: '/500',
    meta: {
      public: true,
    },
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/Error.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/Login.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/Dashboard.vue`
    )
  },
  {
    path: '/userList',
    meta: { breadcrumb: true },
    name: 'userList',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/userList/index.vue`
    )
  },
  {
    path: '/components/alert',
    meta: { breadcrumb: true },
    name: 'components/alerts',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/ui/Alert.vue`
    )
  },
  {
    path: '/layout/bottomsheets',
    meta: { breadcrumb: true },
    name: 'components/bottom-sheets',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/layout/BottomSheets.vue`
    )
  },
  {
    path: '/forms/basic',
    meta: { breadcrumb: true },
    name: 'components/basic-forms',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/form/BasicForms.vue`
    )
  },
  {
    path: '/widgets/social',
    meta: { breadcrumb: true },
    name: 'components/social',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/widgets/Social.vue`
    )
  }
];
