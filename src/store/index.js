import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import candidates from './modules/candidates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    messages,
    candidates
  }
})