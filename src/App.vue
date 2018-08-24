<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('initUser').catch(() => {
      this.$router.push('login');
    });
  },
};
</script>
