var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-div', {
    preload: preload,
    create: create
});
var phaserDiv = document.getElementById("phaser-div");
var runButtonText = document.getElementById("runButton").firstChild;
var numberOfChairs = document.getElementById("numberOfChairs");
var intervalAmount = document.getElementById("intervalAmount");
var defaultN=100;
var defaultInterval=200;
var defaultIndex=0;
var defaultCount=1;
var N = defaultN;
var interval = defaultInterval;
var index;
var count;
var previousEvent;
var chairs;
updateChairs(N);
var running = false;
window.addEventListener("resize", resizeGame);

function preload() {
    game.load.image('chair', 'https://media1.popsugar-assets.com/static/imgs/interview/chair.png');
}

function create() {
    game.stage.backgroundColor = "#FFFFFF";
    drawChairs(N);
}

function drawChairs(N) {
    var xplus = game.width/2;
    var yplus = game.height/2;
    var r = Math.min(xplus,yplus)-60;
    var s = [];
    var t = [];
    var l = 2 * Math.PI * r / N;
    l = Math.floor(l) - 1;
    var style = {
        font: 'Source Sans Pro',
        fontWeight: 300,
        fontSize: '16px',
        fill: "#000000"
    };
    var theta = 0;
    for (i = 0; i < N; i++) {
        var x = r * Math.cos(Math.PI / 2 + Math.PI * theta / 180);
        var y = r * Math.sin(Math.PI / 2 + Math.PI * theta / 180);
        s[i] = game.add.sprite(xplus + x, yplus + y, 'chair');
        // s[i].scale.setTo(l/600, l/600);
        s[i].scale.setTo(1 / 30, 1 / 30);
        s[i].anchor.set(0.5, 0.5);
        s[i].x = xplus + x;
        s[i].y = yplus + y;
        s[i].angle += theta;
        var x2 = (r + 20) * Math.cos(Math.PI / 2 + Math.PI * theta / 180);
        var y2 = (r + 20) * Math.sin(Math.PI / 2 + Math.PI * theta / 180);
        t[i] = game.add.text(xplus + x2, yplus + y2, chairs[i], style);
        t[i].anchor.set(0.5, 0.5);
        t[i].x = xplus + x2;
        t[i].y = yplus + y2;
        theta -= 360 / N;
    }
}

function runSimulation() {
    if (runButtonText.data == "Run Simulation" && running == true) {
        runButtonText.data = "Pause Simulation";
        game.time.events.resume();
    } else if (runButtonText.data == "Pause Simulation" && running == true) {
        runButtonText.data = "Run Simulation";
        game.time.events.pause();
    } else {
        updateN(numberOfChairs.value);
        index = defaultIndex;
        count = defaultCount;
        runButtonText.data = "Pause Simulation";
        game.time.events.remove(previousEvent);
        previousEvent = game.time.events.repeat(interval, chairs.length - 1, removeChair, this);
        running = true;
    }
}

function removeChair() {
    game.world.removeAll();
    N -= 1;
    chairs.splice(index, 1);
    index += count;
    index = index % chairs.length;
    count += 1;
    drawChairs(N);
    if (N == 1) {
        running = false;
        runButtonText.data = "Run Simulation";
    }
}

function updateN(newN) {
    N = parseInt(newN);
    updateChairs(N);
    game.time.events.removeAll();
    game.world.removeAll();
    running = false;
    runButtonText.data = "Run Simulation";
    drawChairs(N);
}

function updateInterval(newInterval) {
    interval = newInterval;
    if (running) {
        game.time.events.remove(previousEvent);
        previousEvent = game.time.events.repeat(interval, chairs.length - 1, removeChair, this);
    }
}

function resetState() {
    numberOfChairs.value = defaultN;
    updateN(defaultN);
    intervalAmount.value = defaultInterval;
    updateInterval(defaultInterval);
    index = defaultIndex;
    count = defaultCount;
}

function resizeGame() {
    var height = phaserDiv.clientHeight;
    var width = phaserDiv.clientWidth;
    game.width = width;
    game.height = height;
    if (game.renderType === 1) {
        game.renderer.resize(width, height);
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
    }
    game.camera.setSize(width, height);
    game.world.removeAll();
    drawChairs(N);
}

function updateChairs(size){
    chairs = Array.apply(null, Array(size)).map(function(_, i) {
       return i + 1;
    });
}