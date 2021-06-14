<template>
  <tr>
    <th scope="row">{{num}}</th>
    <td>{{player.name}}</td>
    <td>{{player.pos}}</td>
    <td>{{player.height}}</td>
    <td>{{player.score}}</td>
    <td>
      <form @submit.prevent="setTeam" class="input-group">
        <select v-model="selectedTeam" class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon" required>
          <option :value="null" disabled>Choose...</option>
          <option :value="team.id"
            v-for="team in teams"
            :key="team.id"
            :selected="team.id === player.teamId"
          >
            {{team.name}}
          </option>
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-primary" type="submit">Set Team</button>
        </div>
      </form>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'PlayerListItem',
  props: ['player', 'num'],
  data () {
    return {
      selectedTeam: null
    }
  },
  computed: {
    teams () {
      return this.$store.state.teams
    }
  },
  methods: {
    setTeam () {
      this.$store.dispatch('setTeam', {
        playerId: this.player.id,
        teamId: this.selectedTeam
      })
        .then(({ data }) => {
          this.$store.commit('SET_NOTIF', 'Success set player team')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.selectedTeam = this.player.teamId
    console.log(this.selectedTeam)
  }
}
</script>

<style>

</style>
