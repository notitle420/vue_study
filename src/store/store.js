import Vue from 'vue'
import Vuex from 'vuex'
import memo from '@/store/modules/memo'
import memos from './modules/memos';
import user from './modules/user';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memo: memo,
    memos: memos,
    user: user
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
