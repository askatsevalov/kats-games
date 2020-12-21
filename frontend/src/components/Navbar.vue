<template>
  <b-navbar toggleable="sm" sticky type="dark" variant="primary">
    <b-navbar-brand href="/">
      <b-img class="brand-logo" thumbnail src="@/assets/logo.png"></b-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="mx-auto">
        <b-nav-item v-for="route in routes" :key="route.path">
          <b-icon :icon="route.meta.icon" />
          <span class="ml-1">{{ route.meta.title }}</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
}
</style>
