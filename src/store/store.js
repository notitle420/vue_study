import Vue from 'vue'
import Vuex from 'vuex'
import art from './modules/art'
import arts from './modules/arts';
import user from './modules/user';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    art: art,
    arts: arts,
    user: user,
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
