<template>
  <div class="columns is-multiline is-variable mt-3 is-4">
    <GameCard v-for="item in games" :key="item.id" :value="item" class="column is-one-third my-2" />
  </div>
</template>

<script>
import { listGames } from '@/api/game';
import GameCard from '../components/GameCard.vue';

export default {
  name: 'Games',
  components: {
    GameCard,
  },
  data() {
    return {
      games: [],
    };
  },
  created() {
    listGames().then(response => {
      this.games = response.data;
    });
  },
};
</script>

<style></style>
