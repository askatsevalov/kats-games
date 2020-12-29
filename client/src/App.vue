<template>
  <div>
    <component :is="layout">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    layout() {
      return this.$route.meta.layout || 'DefaultLayout';
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-leave-active {
  transition-duration: 0s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
