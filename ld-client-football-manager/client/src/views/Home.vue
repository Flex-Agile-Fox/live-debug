<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <TeamCard
          :teams="teams"
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
