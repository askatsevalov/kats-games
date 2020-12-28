<template>
  <div>
    <h1 class="title" v-if="stage == 'wait'">Ожидание игроков...</h1>
    <b-button v-if="stage == 'ready'" type="is-success">Начать игру</b-button>
    <h1 class="title" v-if="stage == 'play'">Уже играем</h1>
    <h1 class="title" v-if="stage == 'non-exist'">Комнаты не существует...</h1>
  </div>
</template>

<script>
import { socketClient } from '@/utils/socket-client';

export default {
  name: 'TicTacToe',
  props: {
    roomId: {
      type: String,
      default: 'null',
    },
  },
  data() {
    return {
      route: '/tictactoe',
      socket: null,
      stage: 'wait',
      players: {},
    };
  },
  watch: {
    $route() {
      this.createOrJoin();
    },
  },
  created() {
    this.socket = socketClient(this.route);
    this.socket.on('connect', () => {
      this.createOrJoin();
    });
    this.socket.on('disconnect', () => {});
    this.socket.on('room-created', roomId => {
      this.$router.push({ name: this.route, params: { roomId: roomId } });
    });
    this.socket.on('ready-to-start', ready => {
      this.stage = ready ? 'ready' : 'wait';
    });
    this.socket.on('need-to-leave', () => {
      console.log('need to leave');
      this.socket.emit('leave-room', this.roomId);
    });
    this.socket.on('roster-changed', players => {
      this.players = players;
    });
    this.socket.on('no-space', () => {
      console.log('No free space in room ' + this.roomId);
    });
    this.socket.on('no-room', () => {
      this.stage = 'non-exist';
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
          title: 'Ваше имя: ',
          size: 'is-large',
          confirmText: 'Принять',
          canCancel: false,
          trapFocus: true,
          onConfirm: value => this.socket.emit('join-room', this.roomId, value),
        });
      }
    },
  },
};
</script>

<style></style>
