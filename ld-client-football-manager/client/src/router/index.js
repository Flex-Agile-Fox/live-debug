import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TeamDetail from '../views/TeamDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/players',
    name: 'Players',
    component: () => import(/* webpackChunkName: "player" */ '../views/PlayerList.vue')
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamDetail
  },
  {
    path: '/teams/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeamDetail.vue'),
    childrens: [
      {
        path: '',
        name: 'TeamDetail',
        component: () => import('../components/TeamDetailDescription')
      },
      {
        path: 'players',
        name: 'TeamDetailPlayers',
        component: () => import('../components/TeamDetailPlayers')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
