import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import MemoList from '@/views/MemoList'
import MemoDetails from '@/views/MemoDetails'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/memo-list',
      name: 'MemoList',
      component: MemoList,
      meta: {
        title: 'memo list'
      }
    },
    {
      path: '/memo/:id',
      name: 'MemoDetails',
      component: MemoDetails,
      props: true,
      meta: {
        title: 'details of memo'
      }
    }
  ]
})
