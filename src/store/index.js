import Vue from 'vue'
import Vuex from 'vuex'
import candidates from './modules/candidates'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

    candidates
  }
})