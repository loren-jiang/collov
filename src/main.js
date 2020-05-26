import Vue from 'vue'
import App from '@/App.vue'

import store from '@/store'
import router from '@/router'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuetify)
export default new Vuetify({ })

// Vue.use(VueRouter)

const vue = new Vue({
  router,
  store,
  vuetify: new Vuetify(),
  vuetify,
  render: h => h(App)
})

vue.$mount('#app')
