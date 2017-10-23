var phaserDiv = document.getElementById("phaser-div");
var game = new Phaser.Game(phaserDiv.clientWidth, phaserDiv.clientHeight, Phaser.CANVAS, 'phaser-div', {
    preload: preload,
    create: create
});
window.addEventListener("resize", resizeCanvas);
var runButtonText = document.getElementById("runButton").firstChild;
var numberOfChairs = document.getElementById("numberOfChairs");
var intervalAmount = document.getElementById("intervalAmount");
var defaultN = 100;
var defaultInterval = 200;
var defaultIndex = 0;
var defaultCount = 1;
var N = defaultN;
var interval = defaultInterval;
var running = false;
var fromSingleStep = false;
var index;
var count;
var previousEvent;
var chairs;
var chairSprites = [];
var textSprites = [];
updateChairs(N);

function preload() {
    game.load.image('chair', 'https://media1.popsugar-assets.com/static/imgs/interview/chair.png');
}

function create() {
    game.stage.backgroundColor = "#FFFFFF";
    index = defaultIndex;
    count = defaultCount;
    drawChairs(N);
}

function drawChairs(N) {
    var offsetX = game.width / 2;
    var offsetY = game.height / 2;
    var radius = Math.min(offsetX, offsetY) - 60;
    var textGap = 20;
    var textSpriteStyle = {
        font: "Source Sans Pro",
        fontWeight: 300,
        fontSize: "16px",
        fill: "#000000"
    };
    var theta = 0;
    for (i = 0; i < N; i++) {
        var chairSpriteX = radius * Math.cos(Math.PI / 2 + Math.PI * theta / 180);
        var chairSpriteY = radius * Math.sin(Math.PI / 2 + Math.PI * theta / 180);
        if (!running && !fromSingleStep) {
            chairSprites[i] = game.add.sprite(offsetX + chairSpriteX, offsetY + chairSpriteY, "chair");
        }
        if (radius >= 220) {
            chairSprites[i].scale.setTo(1 / 30, 1 / 30);
        } else if (radius > 120) {
            chairSprites[i].scale.setTo(1 / 60, 1 / 60);
            textSpriteStyle["fontSize"] = "8px";
            textGap = 10;
        } else {
            chairSprites[i].scale.setTo(1 / 90, 1 / 90);
            textSpriteStyle["fontSize"] = "6px";
            textGap = 6.67;
        }
        chairSprites[i].anchor.set(0.5, 0.5);
        if (!running && !fromSingleStep) {
            chairSprites[i].x = offsetX + chairSpriteX;
            chairSprites[i].y = offsetY + chairSpriteY;
        } else {
            chairSprites[i].angle = 0;
        }
        chairSprites[i].angle += theta;
        var textSpriteX = (radius + textGap) * Math.cos(Math.PI / 2 + Math.PI * theta / 180);
        var textSpriteY = (radius + textGap) * Math.sin(Math.PI / 2 + Math.PI * theta / 180);
        if (!running && !fromSingleStep) {
            textSprites[i] = game.add.text(offsetX + textSpriteX, offsetY + textSpriteY, chairs[i], textSpriteStyle);
        }
        textSprites[i].anchor.set(0.5, 0.5);
        textSprites[i].x = offsetX + textSpriteX;
        textSprites[i].y = offsetY + textSpriteY;
        theta -= 360 / N;
        if (running || fromSingleStep) {
            var nextChairSpriteX = offsetX + chairSpriteX;
            var nextChairSpriteY = offsetY + chairSpriteY;
            var nextTextSpriteX = offsetX + textSpriteX;
            var nextTextSpriteY = offsetY + textSpriteY;
            chairSpriteTweenProperties = {
                x: parseInt(nextChairSpriteX),
                y: parseInt(nextChairSpriteY)
            };
            textSpriteTweenProperties = {
                x: parseInt(nextTextSpriteX),
                y: parseInt(nextTextSpriteY)
            };
            var chairSpriteTween = game.tweens.create(chairSprites[i]);
            var textSpriteTween = game.tweens.create(textSprites[i]);
            chairSpriteTween.to(chairSpriteTweenProperties, 1000, Phaser.Easing.Linear.None, false);
            textSpriteTween.to(textSpriteTweenProperties, 1000, Phaser.Easing.Linear.None, false);
            chairSpriteTween.start();
            textSpriteTween.start();
        }
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
        animateRemoval();
        previousEvent = game.time.events.repeat(interval + 2000, chairs.length - 1, animateRemoval, this);
        running = true;
    }
}

function removeChair() {
    if (N > 1) {
        N -= 1;
        chairs.splice(index, 1);
        chairSprites[index].destroy();
        chairSprites.splice(index, 1);
        textSprites[index].destroy();
        textSprites.splice(index, 1);
        index += count;
        index = index % chairs.length;
        count += 1;
        drawChairs(N);
    }
    if (N == 1) {
        running = false;
        runButtonText.data = "Run Simulation";
    }
    fromSingleStep = false;
}

function animateRemoval() {
    if (N > 1) {
        game.add.tween(chairSprites[index]).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(textSprites[index]).to({
            alpha: 0
        }, 1000, Phaser.Easing.Linear.None, true);
    }
    game.time.events.add(Phaser.Timer.SECOND, removeChair, this);
}

function updateN(newN) {
    if (newN == '') {
        numberOfChairs.value = defaultN;
        updateN(defaultN);
    } else {
        index = defaultIndex;
        count = defaultCount;
        N = parseInt(newN);
        updateChairs(N);
        game.time.events.removeAll();
        game.world.removeAll();
        running = false;
        runButtonText.data = "Run Simulation";
        drawChairs(N);
    }
}

function updateInterval(newInterval) {
    if (parseInt(newInterval) >= 0) {
        interval = parseInt(newInterval);
        if (running) {
            game.time.events.remove(previousEvent);
            previousEvent = game.time.events.repeat(interval + 2000, chairs.length - 1, animateRemoval, this);
        }
    } else {
        intervalAmount.value = defaultInterval;
        updateInterval(defaultInterval);
    }
}

function resetState() {
    numberOfChairs.value = defaultN;
    updateN(defaultN);
    intervalAmount.value = defaultInterval;
    updateInterval(defaultInterval);
}

function resizeCanvas() {
    var height = phaserDiv.clientHeight;
    var width = phaserDiv.clientWidth;
    game.width = width;
    game.height = height;
    if (game.renderType === 1) {
        game.renderer.resize(width, height);
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
    }
    game.camera.setSize(width, height);
    if (!running) {
        game.world.removeAll();
    }
    drawChairs(N);
}

function updateChairs(size) {
    chairs = Array.apply(null, Array(size)).map(function(_, i) {
        return i + 1;
    });
}

function stepInterval(event) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    if (keycode == 38) {
        // Up : Increase by 100
        intervalAmount.value = interval + 100;
        updateInterval(interval + 100);
        return true;
    } else if (keycode == 40) {
        // Down : Decrease by 100
        if (interval - 100 >= 0) {
            intervalAmount.value = interval - 100;
            updateInterval(interval - 100);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function singleStep() {
    if (!running) {
        fromSingleStep = true;
    }
    removeChair();
}