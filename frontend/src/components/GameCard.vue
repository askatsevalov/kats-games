<template>
  <div>
    <div class="image-container is-clickable" @click="kek">
      <b-image :src="baseUrl + value.imageUrl" ratio="1by1">
        <div>
          <b-skeleton slot="placeholder" class="skeleton-placeholder" height="100%"></b-skeleton>
        </div>
      </b-image>
      <div class="image-content p-4">
        <h1 class="title has-text-light">{{ value.name }}</h1>
        <div class="mt-3 content-actions">
          <b-button type="is-primary" class="mb-2" expanded>
            Создать комнату
            <fa-icon icon="plus-circle" />
          </b-button>
          <b-button type="is-primary is-light" expanded>
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
    kek() {
      this.$router.push('/salam');
    },
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  text-align: center;
  color: white;
}

.image-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
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
  position: relative;
}
</style>
