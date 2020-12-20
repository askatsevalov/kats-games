<template>
  <div>
    NAVBAR
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    routes() {
      return this.$router.options.routes.filter(x => !x.hidden);
    },
  },
};
</script>

<style lang="scss" scoped>
.brand-logo {
  height: 3rem;
  width: 3rem;
}
</style>
