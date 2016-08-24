var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    socket.on('motion', function (motion) {
        console.log('x: %d, y: %d, z: %d', motion.x, motion.y, motion.z);
    });

    socket.on('orientation', function (orientation) {
        console.log('alpha: %d, beta: %d, gamma: %d', orientation.alpha,
            orientation.beta,
            orientation.gamma);
    });
});