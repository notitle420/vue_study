import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import ArtsList from '@/views/ArtsList'
import ArtDetails from '@/views/ArtDetails'
import ArtForm from '@/views/ArtForm'
import SignUp from '@/views/SignUp'
import SignIn from '@/views/SignIn'
import firebase from '@/firebase/firebase'

Vue.use(Router)

let router = new Router({
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
      path: '/signin',
      name: 'SignIp',
      component: SignIn
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        requiresAuth: true
      }
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
      path: '/artform',
      name: 'ArtForm',
      component: ArtForm,
      meta: {
        title: 'art form'
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    console.log(requiresAuth)
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
      if (user !== null) {
        next()
      } else {
        next('/signup')
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
