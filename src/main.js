import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'vue-moment'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.config.productionTip = false

Vue.use(moment)
Vue.use(BootstrapVue)
Vue.use(Croppa)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
