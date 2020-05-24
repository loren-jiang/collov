import Vue from 'vue'
import App from '@/App.vue'
import Vuetify from 'vuetify'

import store from '@/store' 
import router from '@/router'

Vue.config.productionTip = false

Vue.use(Vuetify)
// Vue.use(VueRouter)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
})

vue.$mount('#app')
