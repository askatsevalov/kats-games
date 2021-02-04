const redis = require('../utils/redis');
const { setupLobby, PlayerBase, RoomBase, StateBase } = require('./lobby');

module.exports.setup = io => {
    const imaginarium = io.of('/imaginarium');
    setupLobby(io, '/imaginarium', 3, 10);
    imaginarium.on('connection', socket => {
        console.log('Client is connected to imaginarium');

        socket.on('disconnect', () => {
            console.log('Client is disconnected from imaginarium');
        });

    });
};
class Room extends RoomBase {
    players = {};
    state = new State();
}

class Player extends PlayerBase {
    constructor(name) {
        super(name);
    }
}

class State extends StateBase {
    
}

