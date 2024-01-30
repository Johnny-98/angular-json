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
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// Common function to fetch data
const fetchData = (callback) => {
    // Load and cache data on startup
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

app.get('/data', (req, res) => {
    fetchData((err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.send(data);
        }
    });
});

// Socket connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Fetch and emit data
    fetchData((err, data) => {
        if (err) {
            socket.emit('error', 'Error reading data');
        } else {
            socket.emit('data', data);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
