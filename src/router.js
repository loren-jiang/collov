import Vue from 'vue'
import Router from 'vue-router'
import VueDemo from '@/components/VueDemo'
import Messages from '@/components/Messages'
import Candidates from '@/components/Candidates'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'candidates',
      component: Candidates
    },
    // {
    //   path: '/messages',
    //   name: 'messages',
    //   component: Messages
    // },
    {
      path: '/candidates',
      name: 'candidates',
      component: Candidates
    }
  ]
})
