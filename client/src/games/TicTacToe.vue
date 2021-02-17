<template>
  <div class="board">
    <button
      v-for="item in cells"
      :key="item"
      :disabled="!myTurn || gameOver || field[item] != ''"
      @click="move(item)"
    >
      {{ field[item] }}
    </button>
    <div>{{ message }}</div>
    <button v-show="gameOver" class="reset-btn" @click="reset">Начать заново</button>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  props: {
    gameprops: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentTurn: '',
      socket: null,
      roomId: '',
      cells: ['a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'c2'],
      field: {},
      winner: null,
      draw: false,
      mySign: '',
    };
  },
  computed: {
    myTurn() {
      return this.socket.id == this.currentTurn;
    },
    gameOver() {
      return this.winner != null || this.draw;
    },
    message() {
      if (this.winner != null) {
        if (this.socket.id == this.winner) {
          return 'Вы победили!';
        } else {
          return 'Вы проиграли.';
        }
      }

      if (this.draw) {
        return 'Ничья!';
      }

      if (this.myTurn) {
        return `Ваш ход... Ваш знак '${this.mySign}'`;
      } else {
        return 'Ход оппонента....';
      }
    },
  },
  created() {
    console.log('created');
    this.currentTurn = this.gameprops.firstPlayerSocket;
    this.socket = this.gameprops.socket;
    this.mySign = this.myTurn ? 'X' : 'O';
    this.roomId = this.gameprops.roomId;
    this.cells.forEach(x => (this.field[x] = ''));
    this.socket.on('move-made', state => {
      this.currentTurn = state.turnSocketId;
      this.field = state.field;
    });
    this.socket.on('game-over', winner => {
      this.winner = winner;
    });
    this.socket.on('draw', () => {
      this.draw = true;
    });
    this.socket.on('game-reseted', state => {
      this.currentTurn = state.turnSocketId;
      this.field = state.field;
      this.winner = null;
      this.draw = false;
    });
  },
  methods: {
    move(cell) {
      this.socket.emit('make-move', this.roomId, cell, this.mySign);
    },
    reset() {
      this.socket.emit('reset-game', this.roomId);
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  text-align: center;
}
.board {
  margin: auto;
  width: 350px;
}
.board button:not(.reset-btn) {
  height: 100px;
  width: 100px;
  margin: 0px;
  padding: 0px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 3em;
}
</style>
