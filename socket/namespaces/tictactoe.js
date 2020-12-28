const redis = require('../utils/redis');

module.exports.setup = io => {
    const tictactoe = io.of('/tictactoe');
    tictactoe.on('connection', socket => {
        console.log('Client is connected to tictactoe namespace');

        socket.on('disconnecting', () => {
            console.log(socket.rooms);
            for (let roomId of socket.rooms) {
                leaveRoom(socket, roomId);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client is disconnected from tictactoe namespace');
        });

        socket.on('create-room', async () => {
            var roomId = Math.random().toString(36).substr(2, 5).toUpperCase();
            var room = new Room();
            await redis.set(roomId, JSON.stringify(room));
            socket.emit('room-created', roomId);
        });

        socket.on('join-room', async (roomId, playerName) => {
            var room = JSON.parse(await redis.get(roomId));
            if (!room) {
                socket.emit('no-room');
                return;
            }
            if (Object.keys(room.players).length >= 2) {
                socket.emit('no-space');
                return;
            }
            room.players[socket.id] = new Player(playerName, 'o');
            await redis.set(roomId, JSON.stringify(room));
            socket.join(roomId);
            tictactoe.to(roomId).emit('roster-changed', room.players);
            if (Object.keys(room.players).length == 2) {
                tictactoe.to(roomId).emit('ready-to-start', true);
            }
        });

        socket.on('leave-room', async roomId => {
            await leaveRoom(socket, roomId);
        });
    });
};

async function leaveRoom(socket, roomId) {
    console.log('leaving ' + roomId);
    var room = JSON.parse(await redis.get(roomId));
    if (!room) {
        return;
    }
    delete room.players[socket.id];
    console.log(room.players);
    await redis.set(roomId, JSON.stringify(room));
    try {
        socket.leave(roomId);
        tictactoe.to(roomId).emit('roster-changed', room.players);
        if (room.players.length != 2) {
            tictactoe.to(roomId).emit('ready-to-start', false);
        }
    }
    catch (err) {

    }
}

class Room {
    players = {};
    state = new State();
}

class Player {
    constructor(name, sign) {
        this.name = name;
        this.sign = sign;
    }
    sign = '';
    name = '';
}

class State {
    field = [['', '', ''], ['', '', ''], ['', '', '']];
    turnSocketId = '';
}

