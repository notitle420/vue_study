import CONSTANTS from '@/constants'
import firestore from '@/firebase/firestore'
import { USER_SET } from '@/store/modules/mutation-types'

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const userRef = firestore.collection('users')

export default {
  namespaced: true,
  unsubscribe: null,
  state: {
    userdata: {
      id: 0,
      name: "aaaa"
    }
  },
  mutations: {
    [USER_SET](state, payload) {
      state.userdata = payload
    }
  },
  getters: {
    data(state) {
      return state.userdata
    }
  },
  actions: {
    clear({ commit }) {
      commit(USER_SET, CONSTANTS.NEW_EMPTY_USER())
    },
    startListener({ commit }) {
      console.log('start Listener')
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.unsubscribe = userRef.doc("test")
        // DocumentSnapshot
        .onSnapshot(docSnapshot => {
          let payload = null
          if (docSnapshot.exists) {
            payload = {
              id: docSnapshot.data().id,
              name: docSnapshot.data().name,
            }
          }
          commit(USER_SET, payload)
        })
    },
    stopListener() {
      console.log('stop Listener')
      if (this.unsubscribe) {
        console.log('listener is stopping. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    }
  }
}
