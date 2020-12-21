<template>
  <div class="container">
    <div v-for="item in games" :key="item.id">
      <p>Название: {{ item.name }}</p>
      <p>Описание: {{ item.description }}</p>
      <p>Маршрут: {{ item.route }}</p>
      <p>Путь к изображению: {{ item.imageUrl }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Games',
  data() {
    return {
      games: [],
    };
  },
  created() {
    axios.get('/api/game').then(response => {
      this.games = response.data;
    });
  },
};
</script>

<style></style>
