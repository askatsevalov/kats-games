<template>
  <div>
    <div class="image-container">
      <b-image :src="baseUrl + value.imageUrl" ratio="1by1">
        <div>
          <b-skeleton slot="placeholder" class="skeleton-placeholder" height="100%"></b-skeleton>
        </div>
      </b-image>
      <div class="image-content is-overlay is-flex is-flex-direction-column p-4 has-text-centered">
        <h1 class="title has-text-light">{{ value.name }}</h1>
        <div class="mt-3 content-actions is-flex-grow-1">
          <b-button type="is-info is-light" class="mb-2" expanded @click="onDetails(value.id)">
            Подробнее
            <fa-icon icon="info-circle" />
          </b-button>
          <b-button type="is-primary" class="mb-2" expanded @click="createRoom(value.route)">
            Создать комнату
            <fa-icon icon="plus-circle" />
          </b-button>
          <b-button type="is-primary is-light" expanded @click="joinRoom(value.route)">
            Присоединиться
            <fa-icon icon="sign-in-alt" />
          </b-button>
        </div>
      </div>
    </div>
  </div>
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
  methods: {
    onDetails(id) {
      this.$router.push(`/games/${id}`);
    },
    createRoom(route) {
      this.$router.push({ name: route, params: { roomId: 'null' } });
    },
    joinRoom(route) {
      this.$buefy.dialog.prompt({
        title: 'Код комнаты',
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
.image-container {
  position: relative;
  has-text-centeredtext-align: center;
  color: white;
}

.image-content {
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.image-container:hover .image-content {
  opacity: 1;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content-actions {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
}
</style>
