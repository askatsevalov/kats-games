const cors = require('cors');
const express = require('express');
const tictactoe = require('./namespaces/tictactoe');
const imaginarium = require('./namespaces/imaginarium');

const app = express();
app.use(cors());

server = app.listen(3000, _ => {
    console.log('socket-server is running on port 3000');
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

tictactoe.setup(io);
imaginarium.setup(io);