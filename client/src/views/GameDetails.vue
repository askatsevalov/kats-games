<template>
  <div class="mt-5">
    <div class="columns is-mobile header-row">
      <div class="column is-one-third back-button-container">
        <b-button class="back-button" type="is-text" expanded @click="onBack">
          <fa-icon icon="chevron-left" class="mr-2" />Назад</b-button
        >
      </div>
      <div class="column">
        <h1 class="title is-size-4-mobile has-text-centered">{{ game.name }}</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-button type="is-primary is-light" expanded @click="joinRoom(game.route)">
          Присоединиться
          <fa-icon icon="sign-in-alt" />
        </b-button>
      </div>
      <div class="column">
        <b-button type="is-primary" class="mb-2" expanded @click="createRoom(game.route)">
          Создать комнату
          <fa-icon icon="plus-circle" />
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-two-fifths">
        <b-image :src="baseUrl + game.imageUrl" ratio="1by1">
          <div>
            <b-skeleton slot="placeholder" class="skeleton-placeholder" height="100%"></b-skeleton>
          </div>
        </b-image>
      </div>
      <div class="column">
        <p>{{ game.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getGame } from '@/api/game';
import { baseURL } from '@/utils/request';

export default {
  name: 'GameDetails',
  data() {
    return {
      game: {},
    };
  },
  computed: {
    baseUrl() {
      return baseURL;
    },
  },
  created() {
    getGame(this.$route.params.id).then(response => {
      this.game = response.data;
    });
  },
  methods: {
    onBack() {
      this.$router.push('/games');
    },
    createRoom(route) {
      this.$router.push({ name: route, params: { roomId: 'null' } });
    },
    joinRoom(route) {
      this.$buefy.dialog.prompt({
        title: 'Код комнаты: ',
        size: 'is-large',
        confirmText: 'Принять',
        cancelText: 'Отмена',
        inputAttrs: {
          maxlength: 5,
        },
        trapFocus: true,
        onConfirm: value => this.$router.push({ name: route, params: { roomId: value } }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.back-button {
  height: 100%;
  border-radius: 0;
}

.back-button-container {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
}

.header-row {
  border-bottom: 1px solid grey;
}
</style>
