var socket = io();

function motion(event) {
    document.getElementById('accelerometer').innerHTML = 'Accelerometer: '
        + event.accelerationIncludingGravity.x + ', '
        + event.accelerationIncludingGravity.y + ', '
        + event.accelerationIncludingGravity.z;

    socket.emit('motion', {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
    });
}

function orientation(event) {
    document.getElementById('magnetometer').innerHTML = 'Magnetometer: '
        + event.alpha + ', '
        + event.beta + ', '
        + event.gamma;

    socket.emit('orientation', {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
    });
}

function go() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', motion, false);
    } else {
        var status = document.getElementById('status');
        status.innerHTML = status.innerHTML.replace('is supported', 'is not supported');
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', orientation, false);
    } else {
        var status = document.getElementById('status');
        status.innerHTML = status.innerHTML.replace('is supported', 'is not supported');
    }
}

window.onload = go;
