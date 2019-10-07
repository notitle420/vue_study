import CONSTANTS from '@/constants'
import firebase from '@/firebase/firebase'
import { USER_SET } from '@/store/modules/mutation-types'

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const userRef = firebase.firestore().collection('users')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      data: {}
    }
  },
  mutations: {
    [USER_SET](state, payload) {
      state = payload
    }
  },
  getters: {
    data(state) {
      return state.data
    }
  },
  actions: {
    clear({ commit }) {
      commit(USER_SET, CONSTANTS.NEW_EMPTY_USER())
    },
    startListener({ commit }, payload) {
      console.log('start Listener')
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.unsubscribe = userRef.doc(payload.id)
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
