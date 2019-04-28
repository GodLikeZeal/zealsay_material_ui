export default [

  {
    path: '*',
    meta: {
      public: true
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true
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
      public: true
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
      public: true
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
      public: true
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
    title: '桌面',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/Dashboard.vue`
    )
  },
  {
    path: '/user/list',
    meta: { breadcrumb: true },
    name: 'userlist',
    title: '用户列表',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/user/list/index.vue`
    )
  },
  {
    path: '/user/add',
    meta: { breadcrumb: true },
    name: 'useradd',
    title: '用户添加',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/user/add/index.vue`
    )
  },
  {
    path: '/role/list',
    meta: { breadcrumb: true },
    name: 'rolelist',
    title: '角色列表',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/role/list/index.vue`
    )
  },
  {
    path: '/article/category',
    meta: { breadcrumb: true },
    name: 'category',
    title: '分类目录',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/article/category/index.vue`
    )
  },
  {
    path: '/article/add',
    meta: { breadcrumb: true },
    name: 'articleadd',
    title: '写文章',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/views/article/add/index.vue`
    )
  }
];
