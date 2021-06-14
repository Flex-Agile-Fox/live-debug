<template>
  <div>
    <div v-if="!teamPlayer.length">
      There is no player in this team
    </div>
    <ul class="list-group" v-else>
      <li
        class="list-group-item"
        v-for="player in teamPlayer"
        :key="player.id"
      >
         {{ player.name }} - {{ player.pos }} - {{ player.score }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TeamDetailPlayers',
  computed: {
    teamPlayer () {
      return this.$store.state.teamPlayer
    }
  },
  created () {
    this.$store.dispatch('fetchTeamPlayer', {
      teamId: this.$route.params.id
    })
  }
}
</script>

<style>

</style>
