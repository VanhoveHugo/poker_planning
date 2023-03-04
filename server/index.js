require("dotenv").config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

const data = []; // array of users
let state = false; // false = voting, true = reveal

io.on('connection', (socket) => {
    socket.join("pokerplanning");


    //*
    //* Handle Users
    //*

    socket.on('get_data', () => {
        socket.emit('get_data', data);
    });

    socket.on('set_data', ({username, spectator}) => {
        console.log('Login : ' + username);
        data.push({username: username, spectator: spectator});
        socket.local.emit('get_data', data);
    });

    socket.on('update_data', (username) => {
        const isCurrentUser = (user) => user.username === username;
        console.log('Logout : ' + username);
        let findUser = data.find(isCurrentUser);
        let index = data.indexOf(findUser);
        data.splice(index, 1);
        socket.local.emit('get_data', data);

        if(data.length === 0) {
            state = false;
            socket.local.emit('get_state', state);
        }
    });

    socket.on("disconnect", () => {
        socket.local.emit("disctonnectUser");
    });

    //*
    //* Handle Cards
    //*

    socket.on('handle_cards', ({username, note}) => {
        const isCurrentUser = (user) => user.username === username;
        let findUser = data.find(isCurrentUser);
        let index = data.indexOf(findUser);
        data[index].note = note;
        socket.emit('get_data', data); // to emetter
        socket.local.emit('get_data', data); // to all users
    })

    socket.on('get_state', () => {
        socket.emit('get_state', state);
    });

    socket.on('handle_state', () => {
        if(state === false) {
            state = true;
            socket.emit('get_data', data); // to emetter
            socket.local.emit('get_data', data); // to all users
        } else {
            state = false;
            data.forEach(user => {
                delete user.note;
            });
            socket.emit('get_data', data); // to emetter
            socket.local.emit('get_data', data); // to all users
        }
        socket.emit('get_state', state);
        socket.local.emit('get_state', state);
    })

    //*
    //* Handle Stats
    //*

    socket.on('get_stats', () => {
        let all = data.reduce((acc, user) => acc + (parseFloat(user.note) || 0), 0);
        let votes = data.filter(user => user.note !== undefined).length;
        // in my case i just want to know the average but u can add more stats
        let stats = {
            // min: Math.min(...data.map(user => user.note)),
            // max: Math.max(...data.map(user => user.note)),
            average: all / votes,
            // coordination: votes > 1 ? data.filter((user, index, self) => self.findIndex(u => u.note === user.note) !== index).length : 0,
        };
        socket.emit('get_stats', stats);
        socket.local.emit('get_stats', stats);
    })
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});