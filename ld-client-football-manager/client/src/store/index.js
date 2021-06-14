import Vue from 'vue'
import Vuex from 'vuex'
import footballAPI from '../api/footballApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teams: [],
    players: [],
    notif: null,
    team: null,
    teamPlayer: []
  },
  mutations: {
    SET_TEAMS (state, payload) {
      state.teams = payload
    },
    SET_TEAM (state, payload) {
      state.team = payload
    },
    SET_PLAYERS (state, payload) {
      state.players = payload
    },
    SET_TEAM_PLAYER (state, payload) {
      state.teamPlayer = payload
    },
    SET_NOTIF (state, payload) {
      state.notif = payload
    }
  },
  actions: {
    fetchTeams (context) {
      footballAPI
        .get('/teams')
        .then(({ data }) => {
          context.commit('SET_TEAMS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTeamPlayer (context, payload) {
      footballAPI
        .get('/players?teamId=' + payload)
        .then(({ data }) => {
          context.commit('SET_TEAM_PLAYER', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchOneTeam (context, payload) {
      footballAPI
        .get('/teams/' + payload.id)
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_TEAM', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchPlayers (context) {
      footballAPI
        .get('/players')
        .then(({ data }) => {
          context.commit('SET_PLAYERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setTeam (_, payload) {
      return footballAPI
        .patch('/players/' + payload.playerId, {
          teamId: payload.teamId
        })
    }
  },
  modules: {
  }
})
