import Vue from 'vue'
import Router from 'vue-router'
import Candidates from '@/components/Candidates'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'candidates',
      component: Candidates
    },

  ]
})
