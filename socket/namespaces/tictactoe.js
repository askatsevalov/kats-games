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

        socket.on('make-move', async (roomId, cell, sign) => {
            var room = JSON.parse(await redis.get(roomId));
            if (room.state.field === undefined) {
                room.state = new State();
            }
            room.state.field[cell] = sign;
            room.state.turnSocketId = Object.keys(room.players).find(x => x != socket.id);
            await redis.set(roomId, JSON.stringify(room));
            tictactoe.to(roomId).emit('move-made', room.state);
            WIN_COMBINATIONS.forEach(comb => {
                if (checkWinCombination(comb, room.state.field, sign)) {
                    tictactoe.to(roomId).emit('game-over', socket.id);
                    return;
                }
            });
            if (Object.values(room.state.field).every(x => x != '')) {
                tictactoe.to(roomId).emit('draw');
            }
        });

        socket.on('reset-game', async roomId => {
            var room = JSON.parse(await redis.get(roomId));
            room.state = new State();
            room.state.turnSocketId = socket.id;
            await redis.set(roomId, JSON.stringify(room));
            tictactoe.to(roomId).emit('game-reseted', room.state);
        });
    });
};

function checkWinCombination(combination, field, sign) {
    let check = true;
    combination.forEach(cell => {
        if (field[cell] != sign) {
            check = false;
        }
    });
    return check;
}

class State extends StateBase {
    field = {
        'a0': '', 'a1': '', 'a2': '',
        'b0': '', 'b1': '', 'b2': '',
        'c0': '', 'c1': '', 'c2': '',
    };
}

const WIN_COMBINATIONS = [
    ['a0', 'a1', 'a2'],
    ['b0', 'b1', 'b2'],
    ['c0', 'c1', 'c2'],
    ['a0', 'b0', 'c0'],
    ['a1', 'b1', 'c1'],
    ['a3', 'b3', 'c3'],
    ['a0', 'b1', 'c2'],
    ['a2', 'b1', 'c0']
];