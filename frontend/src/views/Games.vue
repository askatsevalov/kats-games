<template>
  <div class="container">

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
      console.log(response);
      this.games = response.data;
    });
  },
};
</script>

<style></style>
