<template>
  <div class="fullheight">
    <div v-if="stage == 'wait' || stage == 'ready' || stage == 'play'" class="is-hidden-desktop">
      <b-button type="is-info" class="is-radiusless" expanded @click="showPlayers = true">
        Игроков: {{ Object.keys(players).length }}
      </b-button>
    </div>
    <div class="columns fullheight is-gapless">
      <div
        v-if="stage == 'wait' || stage == 'ready' || stage == 'play'"
        class="columns column is-one-fifth is-hidden-touch players-menu"
      >
        <div class="column is-full">
          <PlayerCard v-for="(item, id) in players" :key="id" :value="item" :me="socket.id == id" />
        </div>
      </div>
      <div class="is-flex is-align-items-center is-justify-content-center column">
        <div v-if="stage == 'wait'" class="title is-1 has-text-primary box has-text-centered">
          <h2 class="mb-3">Ожидание игроков...</h2>
          <b-progress type="is-primary"></b-progress>
        </div>
        <div v-if="stage == 'ready'" class="title is-1 has-text-primary box has-text-centered">
          <b-button type="is-success" class="is-size-1 is-size-3-mobile" @click="startGame"
            >Начать игру</b-button
          >
        </div>
        <div v-if="stage == 'play'"><router-view /></div>
        <div v-if="stage == 'non-exist'" class="title is-1 has-text-primary box has-text-centered">
          <fa-icon icon="surprise" />
          <h2>Ой, комната не существует...</h2>
        </div>
        <div v-if="stage == 'full'" class="title is-1 has-text-primary box has-text-centered">
          <fa-icon icon="sad-tear" />
          <h2>Ой, в комнате нет места...</h2>
        </div>
      </div>
    </div>
    <b-sidebar v-model="showPlayers" class="is-hidden-desktop" type="is-light" fullheight>
      <PlayerCard
        v-for="(item, id) in players"
        :key="id"
        :value="item"
        :me="socket.id == id"
        class="p-1"
      />
    </b-sidebar>
  </div>
</template>

<script>
import { socketClient } from '@/utils/socket-client';
import PlayerCard from '../components/PlayerCard.vue';

export default {
  name: 'TicTacToe',
  components: {
    PlayerCard,
  },
  props: {
    roomId: {
      type: String,
      default: 'null',
    },
  },
  data() {
    return {
      socket: null,
      stage: '',
      players: {},
      showPlayers: false,
    };
  },
  computed: {
    game() {
      return this.$route.path.split('/')[1];
    },
  },
  watch: {
    $route() {
      this.createOrJoin();
    },
  },
  created() {
    this.socket = socketClient(`/${this.game}` + '/lobby');
    this.socket.on('connect', () => {
      this.createOrJoin();
    });
    this.socket.on('disconnect', () => {});
    this.socket.on('room-created', roomId => {
      this.$router.replace({ name: `/${this.game}`, params: { roomId: roomId } });
    });
    this.socket.on('ready-to-start', ready => {
      this.stage = ready ? 'ready' : 'wait';
    });
    this.socket.on('roster-changed', players => {
      this.players = players;
    });
    this.socket.on('no-space', () => {
      this.stage = 'full';
    });
    this.socket.on('no-room', () => {
      this.stage = 'non-exist';
    });
    this.socket.on('game-started', () => {
      this.stage = 'play';
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  methods: {
    createOrJoin() {
      if (this.roomId === 'null') {
        this.socket.emit('create-room');
      } else {
        this.$buefy.dialog.prompt({
          title: 'Имя',
          confirmText: 'Принять',
          canCancel: false,
          trapFocus: true,
          onConfirm: value => this.socket.emit('join-room', this.roomId, value),
        });
      }
    },
    startGame() {
      this.socket.emit('start-game', this.roomId);
    },
  },
};
</script>

<style scoped lang="scss">
.fullheight {
  height: 100%;
}

.players-menu {
  overflow-y: auto;
  box-shadow: 0 0 0 2px #f5f5f5;
}

.players-menu::-webkit-scrollbar {
  width: 0.25rem;
}

.players-menu::-webkit-scrollbar-track {
  background: ghostwhite;
}

.players-menu::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 89%);
}
</style>
