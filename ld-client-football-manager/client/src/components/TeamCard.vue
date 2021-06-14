<template>
  <div class="col-md-4">
    <div v-for="team in teams" :key="team.id" class="card mb-4 box-shadow p-3">
      <img class="card-img-top img-item" :src="team.img" >
      <div class="card-body">
        <h5 class="card-title">{{ team.name }}</h5>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group mx-auto">
            <router-link to="`/teams/{team.id}`" class="btn btn-sm btn-outline-primary">Show Detail</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamCard',
  props: ['teams']
}
</script>

<style>

</style>
