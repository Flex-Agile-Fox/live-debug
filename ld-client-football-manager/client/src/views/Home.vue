<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :team="team"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TeamCard from '../components/TeamCard'
export default {
  name: 'Home',
  components: {
    TeamCard
  },
  computed: {
    teams () {
      return this.$store.state.teams
    }
  },
  created () {
    this.$store.dispatch('fetchTeams')
  }
}
</script>
