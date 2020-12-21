<template>
  <b-navbar sticky type="dark" variant="primary">
    <b-navbar-nav class="ml-auto">
      <b-nav-item
        v-for="route in routesLeft"
        :key="route.path"
        :active="$route.path == route.path"
        :to="route.path"
      >
        <h4 class="d-flex flex-column m-0">
          <b-icon :icon="route.meta.icon" class="mx-auto" />
          {{ route.meta.title }}
        </h4>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-brand href="/" class="mx-5">
      <b-img class="brand-logo" thumbnail src="@/assets/logo.png"></b-img>
    </b-navbar-brand>
    <b-navbar-nav class="mr-auto">
      <b-nav-item
        v-for="route in routesRight"
        :key="route.path"
        :active="$route.path == route.path"
        :to="route.path"
      >
        <h4 class="d-flex flex-column m-0">
          <b-icon :icon="route.meta.icon" class="mx-auto" />
          {{ route.meta.title }}
        </h4>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    routesLeft() {
      return this.$router.options.routes.filter(x => !x.hidden && x.meta.position === 'left');
    },
    routesRight() {
      return this.$router.options.routes.filter(x => !x.hidden && x.meta.position === 'right');
    },
  },
};
</script>

<style lang="scss" scoped>
.brand-logo {
  height: 4rem;
}
</style>
