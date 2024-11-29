require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static('frontend/public')); // Servir archivos desde 'frontend/public'

// Conecta la base de datos
const db = require('./database');
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}
mongoose.connect(mongoUri, db.options).then(
    () => { console.log('Connected to MongoDB') },
    err => { console.error('Failed to connect to MongoDB', err) }
);

// Rutas
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Configuración de WebSocket
require('./websockets/taskSockets')(io);

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/public/index.html');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
