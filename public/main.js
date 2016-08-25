$(function () {
    var socket = io();

    var motionChart = echarts.init(document.getElementById('accelerometer'));
    motionChart.setOption({
        title: {
            text: '加速度传感器'
        },
        tooltip: {},
        legend: {
            data: ['加速度']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '加速度',
            type: 'bar',
            data: []
        }]
    });

    var orientationChart = echarts.init(document.getElementById('magnetometer'));
    orientationChart.setOption({
        title: {
            text: '磁力计传感器'
        },
        tooltip: {},
        legend: {
            data: ['方位角度']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '方位角度',
            type: 'bar',
            data: []
        }]
    });

    function motion(event) {
        motionChart.setOption({
            xAxis: {
                data: ['x', 'y', 'z']
            },
            series: [{
                name: '加速度',
                data: [
                    event.accelerationIncludingGravity.x,
                    event.accelerationIncludingGravity.y,
                    event.accelerationIncludingGravity.z
                ]
            }]
        });

        socket.emit('motion', {
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z
        });
    }

    function orientation(event) {
        orientationChart.setOption({
            xAxis: {
                data: ['alpha', 'beta', 'gamma']
            },
            series: [{
                name: '方位角度',
                data: [
                    event.alpha,
                    event.beta,
                    event.gamma
                ]
            }]
        });

        socket.emit('orientation', {
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma
        });
    }

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
});