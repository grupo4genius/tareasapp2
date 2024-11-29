module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('taskUpdated', (task) => {
            socket.broadcast.emit('taskUpdated', task);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
