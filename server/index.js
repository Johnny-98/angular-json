const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const fs = require('fs');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Specify the client URL if you want to restrict origins
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// Endpoint to fetch data
app.get('/data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        res.send(JSON.parse(data));
    });
});

// Socket connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Fetch and emit data
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            socket.emit('error', 'Error reading data');
            return;
        }
        socket.emit('data', JSON.parse(data));
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});