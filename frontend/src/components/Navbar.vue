<template>
  <b-navbar class="my-navbar" type="is-white" spaced shadow wrapper-class="container">
    <template slot="brand">
      <b-navbar-item class="brand ml-1">
        <img class="brand-logo" src="@/assets/logo.png" alt="Kats Games" />
      </b-navbar-item>
      <div class="is-flex is-flex-direction-row is-hidden-touch">
        <b-navbar-item target="_blank" href="https://github.com/askatsevalov">
          <fa-icon :icon="['fab', 'github']" />
        </b-navbar-item>
        <b-navbar-item target="_blank" href="https://www.instagram.com/askatsevalov/">
          <fa-icon :icon="['fab', 'instagram']" />
        </b-navbar-item>
        <b-navbar-item target="_blank" href="https://www.facebook.com/askatsevalov/">
          <fa-icon :icon="['fab', 'facebook']" />
        </b-navbar-item>
        <b-navbar-item target="_blank" href="https://twitter.com/askatsevalov">
          <fa-icon :icon="['fab', 'twitter']" />
        </b-navbar-item>
        <b-navbar-item target="_blank" href="https://vk.com/askatsevalov">
          <fa-icon :icon="['fab', 'vk']" />
        </b-navbar-item>
        <b-navbar-item target="_blank" href="https://t.me/askatsevalov">
          <fa-icon :icon="['fab', 'telegram']" />
        </b-navbar-item>
      </div>
    </template>
    <template slot="end">
      <b-navbar-item
        v-for="route in routes"
        :key="route.path"
        :active="$route.path == route.path"
        :to="route.path"
        class="is-size-5"
      >
        <fa-icon :icon="route.meta.icon" class="mr-2" />
        {{ route.meta.title }}
      </b-navbar-item>
    </template>
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
.my-navbar {
  color: rgb(53, 53, 53);
}

a.navbar-item.is-active {
  color: #7957d5 !important;
}

a.navbar-item:not(.is-active):hover {
  background-color: #fafafa !important;
  color: #7957d5 !important;
}

.brand-logo {
  max-height: 5rem;
}

.navbar-brand .brand {
  padding: 0;
  width: 15rem;
}
</style>
