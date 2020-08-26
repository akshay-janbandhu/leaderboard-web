import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false


Vue.use(VueRouter)

import Leaderboard from './components/Leaderboard.vue';

const routes = [
  { path: '/', component: Leaderboard }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(Leaderboard)
}).$mount('#app')