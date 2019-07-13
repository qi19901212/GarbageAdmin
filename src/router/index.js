import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/sort',
    component: Layout,
    name: 'sort',
    meta: { title: '分类', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/sort/index'),
        meta: { title: '分类列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/garbage',
    component: Layout,
    meta: {
      title: '垃圾',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        name: 'garbage',
        component: () => import('@/views/garbage/index'),
        meta: { title: '垃圾列表', icon: 'form' }
      },{
        path: 'add',
        name: 'garbageAdd',
        component: () => import('@/views/garbage/add'),
        meta: { title: '垃圾添加', icon: 'form' }
      }
    ]
  },
  {
    path: '/commit',
    component: Layout,
    meta: {
      title: '垃圾名称添加',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/commit/index'),
        meta: { title: '客户端用户提交', icon: 'form' }
      },{
        path: 'add',
        hidden: true,
        name: 'commitAdd',
        component: () => import('@/views/commit/add'),
        meta: { title: '添加', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    meta: {
      title: '开源地址',
      icon: 'nested'
    },
    children: [
      {
        path: 'https://github.com/qi19901212/GarbageAdmin',
        meta: { title: '此项目开源地址', icon: 'link' }
      },
      {
        path: 'https://github.com/qi19901212/Garbage',
        meta: { title: '小程序开源地址', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
