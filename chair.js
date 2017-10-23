/**
 * @fileOverview The logic for the 100 chair problem.
 * @author <a href="mailto:yashketkar@hotmail.com">Yash Ketkar</a>
 * @version 1.0.0
 */
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
/**
 * This function is called during the "preload" state of the phaser lifecycle.
 * It loads the chair asset from the url.
 * @returns Nothing.
 */
function preload() {
    game.load.image('chair', 'https://media1.popsugar-assets.com/static/imgs/interview/chair.png');
}
/**
 * This function is called during the "create" state of the phaser lifecycle.
 * It sets the index and count to the default and then
 * @returns Nothing.
 */
function create() {
    game.stage.backgroundColor = "#FFFFFF";
    index = defaultIndex;
    count = defaultCount;
    drawChairs(N);
}
/**
 * This function draws the chairs on the phaser canvas based on the updated
 * number of chairs.
 * It is called during various stages of the lifecycle to update the canvas
 * based on current values.
 * @param {int} N The number of chairs to draw..
 * @returns Nothing.
 */
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
/**
 * This function is called when the "Run Simulation" button is clicked.
 * It controls the starting, pausing and resuming of the simulation.
 * @returns Nothing.
 */
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
/**
 * This function removes the next chair to be removed from the canvas.
 * @returns Nothing.
 */
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
/**
 * This function animates the chair removal process.
 * @returns Nothing.
 */
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
/**
 * This function is called when there are updates to the textbox
 * for the number of chairs.
 * @returns Nothing.
 */
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
/**
 * This function is called when there are updates to the textbox
 * for the interval between eliminations.
 * @returns Nothing.
 */
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
/**
 * This function resets the simulation to the default state.
 * @returns Nothing.
 */
function resetState() {
    numberOfChairs.value = defaultN;
    updateN(defaultN);
    intervalAmount.value = defaultInterval;
    updateInterval(defaultInterval);
}
/**
 * This function updates the phaser canvas based on the
 * current height and width.
 * @returns Nothing.
 */
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
/**
 * This function updates the string array for each chair's number text.
 * @returns Nothing.
 */
function updateChairs(size) {
    chairs = Array.apply(null, Array(size)).map(function(_, i) {
        return i + 1;
    });
}
/**
 * This function handles steps of 100 for interval input.
 * @returns Nothing.
 */
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
/**
 * This function handles the click of "Single Step" button.
 * @returns Nothing.
 */
function singleStep() {
    if (!running) {
        fromSingleStep = true;
    }
    removeChair();
}
