<template>
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
      <div class="container d-flex justify-content-between">
        <router-link
          class="navbar-brand d-flex align-items-center"
          to="/"
        >
          football manager
        </router-link>
        <ul class="nav text-white">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Teams</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/players">Players</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
  .nav-link.text-white:hover {
    color: white !important;
    font-weight: 700;
  }
</style>
