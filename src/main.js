import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store'
import router from '@/router'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)
export default new Vuetify({ })

// Vue.use(VueRouter)

const vue = new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
})

vue.$mount('#app')
