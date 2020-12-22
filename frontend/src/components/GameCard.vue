<template>
  <b-card no-body class="game-card">
    <b-img :src="baseUrl + value.imageUrl" class="game-img" />
  </b-card>
</template>

<script>
import Game from '@/models/game.js';
import { baseURL } from '@/utils/request';

export default {
  name: 'GameCard',
  props: {
    value: {
      type: Object,
      default: new Game(),
    },
  },
  computed: {
    baseUrl() {
      return baseURL;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
