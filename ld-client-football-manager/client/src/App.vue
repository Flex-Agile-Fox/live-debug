<template>
  <div id="app">
    <Navbar />
    <main role="main">
      <Headline />
      <BaseNotification
        :notif="notif"
        v-if="notif"
      />
    </main>
    <router-view></router-view>
  </div>
</template>

<script>
import BaseNotification from './components/BaseNotification'
import Navbar from './components/Navbar'
import Headline from './components/Headline'

export default {
  name: 'App',
  components: {
    Navbar,
    Headline,
    BaseNotification
  },
  data () {
    return {
      notif: this.$store.state.notif
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
