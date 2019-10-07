import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ArtsList from '@/views/ArtsList'
import ArtDetails from '@/views/ArtDetails'
import SignUp from '@/components/SignUp'

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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
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
      path: '/arts',
      name: 'Arts',
      component: ArtsList,
      meta: {
        title: 'memo list'
      }
    },
    {
      path: '/arts/:id',
      name: 'ArtDetails',
      component: ArtDetails,
      props: true,
      meta: {
        title: 'details of memo'
      }
    }
  ]
})
