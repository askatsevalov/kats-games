<template>
  <div>
    <Navbar />
    <div><slot /></div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  },
};
</script>

<style></style>
