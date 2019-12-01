import firebase from '@/firebase/firebase'

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      data: []
    }
  },
}
