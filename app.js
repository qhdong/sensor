var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    uuid = require('uuid'),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.emit('uuid', {uuid: uuid.v1()});

    socket.on('motion', function (motion) {
        console.log('uuid: %s - x: %d, y: %d, z: %d', motion.uuid, motion.x, motion.y, motion.z);
    });

    socket.on('orientation', function (orientation) {
        console.log('uuid: %s - alpha: %d, beta: %d, gamma: %d',
            orientation.uuid,
            orientation.alpha,
            orientation.beta,
            orientation.gamma);
    });
});