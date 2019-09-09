import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    memos: [
      { id: 1, title: '...', description: '...', platforms: ['...'], million: false, releasedAt: new Date() },
      { id: 2, title: '...', description: '...', platforms: ['...'], million: false, releasedAt: new Date() },
      { id: 3, title: '...', description: '...', platforms: ['...'], million: false, releasedAt: new Date() },
      // ...省略 ...
      { id: 14, title: '...', description: '...', platforms: ['...'], million: false, releasedAt: new Date() }
    ],
    nextId: 15
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // ここにアクションを記述
  },
  modules: {
    // ここにモジュールを記述
  }
})
