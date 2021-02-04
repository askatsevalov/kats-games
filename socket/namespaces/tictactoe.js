const redis = require('../utils/redis');
const { setupLobby, PlayerBase, RoomBase, StateBase } = require('./lobby');

module.exports.setup = io => {
    const tictactoe = io.of('/tictactoe');
    setupLobby(io, '/tictactoe', 2, 2);
    tictactoe.on('connection', socket => {
        console.log('Client is connected to tictactoe');

        socket.on('disconnect', () => {
            console.log('Client is disconnected from tictactoe');
        });

    });
};
class Room extends RoomBase {
    players = {};
    state = new State();
}

class Player extends PlayerBase {
    constructor(name, sign) {
        super(name);
        this.sign = sign;
    }
    sign = '';
}

class State extends StateBase {
    field = [['', '', ''], ['', '', ''], ['', '', '']];
}

