<template>
  <div class="columns is-mobile">
    <div class="column is-one-third">
      <b-tag v-if="me" class="is-danger me-badge" rounded>Я</b-tag>
      <b-image :src="avatarUrl" ratio="1by1" rounded>
        <div>
          <b-skeleton slot="placeholder" class="skeleton-placeholder" height="100%"></b-skeleton>
        </div>
      </b-image>
    </div>
    <div class="column is-two-thirds is-flex is-align-items-center has-text-centered">
      <h3 class="title is-3 one-line mb-0">{{ value.name }}</h3>
    </div>
  </div>
</template>

<script>
import { AvatarGenerator } from 'random-avatar-generator';

export default {
  name: 'PlayerCard',
  props: {
    value: {
      type: Object,
      default: new Object(),
    },
    me: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      avatarUrl: '',
    };
  },
  created() {
    const generator = new AvatarGenerator();
    this.avatarUrl = generator.generateRandomAvatar(this.value.name);
  },
};
</script>

<style scoped lang="scss">
.one-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.me-badge {
  position: absolute;
  z-index: 1000;
}
</style>
