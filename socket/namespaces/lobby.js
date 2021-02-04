const redis = require('../utils/redis');

function setupLobby(io, game, minPlayers, maxPlayers) {
    const lobby = io.of(game + '/lobby');
    lobby.on('connection', socket => {
        console.log('Client is connected to lobby');

        socket.on('disconnecting', () => {
            for (let roomId of socket.rooms) {
                leaveRoom(socket, roomId);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client is disconnected from lobby');
        });

        socket.on('create-room', async () => {
            var roomId = Math.random().toString(36).substr(2, 5).toUpperCase();
            var room = new RoomBase(game);
            await redis.set(roomId, JSON.stringify(room));
            socket.emit('room-created', roomId);
        });

        socket.on('join-room', async (roomId, playerName) => {
            var room = JSON.parse(await redis.get(roomId));
            console.log(room);
            if (!room || room.game != game) {
                socket.emit('no-room');
                return;
            }
            if (Object.keys(room.players).length >= maxPlayers) {
                socket.emit('no-space');
                return;
            }
            room.players[socket.id] = new PlayerBase(playerName);
            await redis.set(roomId, JSON.stringify(room));
            socket.join(roomId);
            lobby.to(roomId).emit('roster-changed', room.players);
            lobby.to(roomId).emit('ready-to-start', Object.keys(room.players).length >= minPlayers && Object.keys(room.players).length <= maxPlayers);
        });

        socket.on('leave-room', async roomId => {
            await leaveRoom(socket, roomId);
        });
    });

    async function leaveRoom(socket, roomId) {
        var room = JSON.parse(await redis.get(roomId));
        if (!room) {
            return;
        }
        delete room.players[socket.id];
        await redis.set(roomId, JSON.stringify(room));
        try {
            socket.to(roomId).emit('roster-changed', room.players);
            socket.leave(roomId);
            if (Object.keys(room.players).length == 0) {
                await redis.expire(roomId, 60);
            }
            if (Object.keys(room.players).length < minPlayers || Object.keys(room.players).length > maxPlayers) {
                lobby.to(roomId).emit('ready-to-start', false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
};

class RoomBase {
    constructor(game) {
        this.game = game;
    }
    players = {};
    state = new StateBase();
    game = '';
}

class PlayerBase {
    constructor(name, isMain) {
        this.name = name;
        this.isMain = isMain;
    }
    name = '';
    isMain = false;
}

class StateBase{
    turnSocketId = '';
}

module.exports = {
    setupLobby,
    RoomBase,
    PlayerBase,
    StateBase
}