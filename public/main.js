$(function () {
    var socket = io.connect('http://115.159.83.89:3000');

    var POINTS = 1000;

    var xData = [],
        yData = [],
        zData = [],
        alphaData = [],
        betaData = [],
        gammaData = [];

    var uuid = '';
    socket.on('uuid', function (data) {
        uuid = data.uuid;
        $('#uuid').html(uuid);
    });


    // var motionChart = echarts.init(document.getElementById('accelerometer'));
    // motionChart.setOption({
    //     title: {
    //         text: '加速度传感器'
    //     },
    //     tooltip: {},
    //     legend: {
    //         data: ['x', 'y', 'z']
    //     },
    //     xAxis: {
    //         type: 'time',
    //         splitLine: {
    //             show: false
    //         }
    //     },
    //     yAxis: {
    //         type: 'value',
    //         splitLine: {
    //             show: false
    //         }
    //     },
    //     series: [
    //         {
    //             name: 'x',
    //             type: 'line',
    //             data: []
    //         }, {
    //             name: 'y',
    //             type: 'line',
    //             data: []
    //         }, {
    //             name: 'z',
    //             type: 'line',
    //             data: []
    //         }
    //     ]
    // });
    //
    // var orientationChart = echarts.init(document.getElementById('magnetometer'));
    // orientationChart.setOption({
    //     title: {
    //         text: '磁力计传感器'
    //     },
    //     tooltip: {},
    //     legend: {
    //         data: ['alpha', 'gamma', 'beta']
    //     },
    //     xAxis: {
    //         type: 'time',
    //         splitLine: {
    //             show: false
    //         }
    //     },
    //     yAxis: {
    //         type: 'value',
    //         splitLine: {
    //             show: false
    //         }
    //     },
    //     series: [
    //         {
    //             name: 'alpha',
    //             type: 'line',
    //             data: []
    //         }, {
    //             name: 'beta',
    //             type: 'line',
    //             data: []
    //         }, {
    //             name: 'gamma',
    //             type: 'line',
    //             data: []
    //         }
    //     ]
    // });

    function motion(event) {
        // if (xData.length > POINTS) {
        //     xData.shift();
        //     yData.shift();
        //     zData.shift();
        // }
        //
        // xData.push(event.accelerationIncludingGravity.x);
        // yData.push(event.accelerationIncludingGravity.y);
        // zData.push(event.accelerationIncludingGravity.z);

        // motionChart.setOption({
        //     series: [{
        //         name: 'x',
        //         data: xData
        //     }, {
        //         name: 'y',
        //         data: yData
        //     }, {
        //         name: 'z',
        //         data: zData
        //     }
        //     ]
        // });

        socket.emit('motion', {
            uuid: uuid,
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z
        });
    }

    function orientation(event) {
        // if (alphaData.length > POINTS) {
        //     alphaData.shift();
        //     betaData.shift();
        //     gammaData.shift();
        // }
        //
        // alphaData.push(event.alpha);
        // betaData.push(event.beta);
        // gammaData.push(event.gamma);
        //
        // orientationChart.setOption({
        //     series: [{
        //         name: 'alpha',
        //         data: alphaData
        //     }, {
        //         name: 'beta',
        //         data: betaData
        //     }, {
        //         name: 'gamma',
        //         data: gammaData
        //     }]
        // });

        socket.emit('orientation', {
            uuid: uuid,
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