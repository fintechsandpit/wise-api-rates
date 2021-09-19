import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Rates from '@/components/Rates'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rates',
      component: Rates
    }
  ]
})
