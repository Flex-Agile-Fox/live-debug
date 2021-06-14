<template>
  <div class="py-5">
    <div class="container" v-if="team">
      <!-- this is detail page & comment -->
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4 box-shadow text-center">
            <img class="card-img-top mx-auto" style="width: auto;
            height: 30vw;
            object-fit: cover;" :src="team.img" >
            <div class="card-body">
              <h5 class="card-title">{{team.name}}</h5>
              <p class="card-text">Coach {{team.coach}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <ul class="nav">
            <li class="nav-item">
              <router-link
                class="nav-link text-lg"
                :class="$route.name === 'TeamDetail' ? 'active' : null"
                :to="'/teams/'+ team.id">
                Description
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-lg"
                :class="$route.name === 'TeamDetailPlayers' ? 'active' : null"
                :to="'/teams/'+ team.id + '/players'"
              >
                Players
              </router-link>
            </li>
          </ul>
          <div class="p-4">
            <router-view
              :description="team.description"
            ></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamDetail',
  computed: {
    team () {
      return this.$store.state.team
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.$store.dispatch('fetchOneTeam', {
      id: this.$route.params.id
    })
  }
}
</script>

<style>
  .text-lg {
    font-size: 1.5rem;
  }
  .active {
    border-bottom: 1px solid blue;
  }
</style>
