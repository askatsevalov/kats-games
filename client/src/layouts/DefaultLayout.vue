<template>
  <main>
    <Navbar />
    <div class="main is-flex">
      <div :class="containerized + ' is-flex-grow-1'"><slot /></div>
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Footer,
  },
  computed: {
    containerized() {
      return this.$route.meta.fullwidth ? 'is-clipped' : 'container px-2';
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  flex: 1;
}

.main::-webkit-scrollbar {
  width: 0.25rem;
}

.main::-webkit-scrollbar-track {
  background: ghostwhite;
}

.main::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 29%);
}
</style>
