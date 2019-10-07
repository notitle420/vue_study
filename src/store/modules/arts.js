import firebase from '@/firebase/firebase'
import { ARTS_INIT, ARTS_ADD, ARTS_SET, ARTS_REMOVE } from '@/store/modules/mutation-types'

// firebase.firestore.Firestore.collection(collectionPath)
// returns firebase.firestore.CollectionReference
const artsRef = firebase.firestore().collection('memos')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      data: []
    }
  },
  mutations: {
    [ARTS_INIT](state, payload) {
      state.data = payload
    },
    [ARTS_ADD](state, payload) {
      state.data.push(payload)
      state.data.sort((a, b) => {
        return a.releasedAt.getTime() - b.releasedAt.getTime()
      })
    },
    [ARTS_SET](state, payload) {
      const index = state.data.findIndex(art => art.id === payload.id)
      if (index !== -1) {
        state.data[index] = payload
      }
    },
    [ARTS_REMOVE](state, payload) {
      const index = state.data.findIndex(art => art.id === payload.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  getters: {
    data(state) {
      return state.data
    }
  },
  actions: {
    clear({ commit }) {
      commit(ARTS_INIT, [])
    },
    startListener({ commit }) {
      console.log('start listener')
      if (this.unsubscribe) {
        console.warn('listener is running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      this.unsubscribe = artsRef.orderBy('releasedAt', 'asc')
        // firebase.firestore.QuerySnapshot
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            const payload = {
              id: change.doc.id,
              title: change.doc.data().title,
              description: change.doc.data().description,
              platforms: change.doc.data().platforms,
              million: change.doc.data().million,
              releasedAt: new Date(change.doc.data().releasedAt.seconds * 1000)
            }
            if (change.type === 'added') {
              commit(ARTS_ADD, payload)
            } else if (change.type === 'modified') {
              commit(ARTS_SET, payload)
            } else if (change.type === 'removed') {
              commit(ARTS_REMOVE, payload)
            }
          })
        },
          (error) => {
            console.error(error.name)
          })
    },
    stopListener() {
      console.log('stop listener')
      if (this.unsubscribe) {
        console.log('listener is stopping. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    addArt({ commit }, payload) {
      artsRef.add(payload)
        .then(doc => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error adding document: ', err)
        })
    },
    deleteArt({ commit }, payload) {
      artsRef.doc(payload.id).delete()
        .then(() => {
          // Do not mutate vuex store state outside mutation handlers.
        })
        .catch(err => {
          console.error('Error removing document: ', err)
        })
    }
  }
}
