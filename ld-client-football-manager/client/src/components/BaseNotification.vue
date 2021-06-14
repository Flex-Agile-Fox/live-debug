<template>
  <div class="alert alert-primary container" role="alert">
    {{ notif }}
  </div>
</template>

<script>
export default {
  name: 'BaseNotification',
  props: ['notif'],
  created () {
    setTimeout(() => {
      this.$store.dispatch('SET_NOTIF', null)
    }, 2000)
  }
}
</script>

<style>

</style>
