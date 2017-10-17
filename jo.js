var canvas;
var ctx;

function setupCanvas() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    var base_image = new Image();
    base_image.onload = function() {
        console.log(base_image);
        ctx.translate(685, 472);
        var theta = 0;
        var alpha = Math.PI / 2;
        for (i = 0; i < 50; i++) {
            var x = 400 * Math.cos(alpha - theta);
            var y = 400 * Math.sin(alpha - theta);
            rot_image = rotateAndCache(base_image, theta)
            ctx.drawImage(rot_image, x, y, 20, 20);
            theta += 0.1;
        }
    }
    base_image.src = "chair.svg";
    fitToContainer(canvas);
}
rotateAndCache = function(image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var offscreenCtx = offscreenCanvas.getContext('2d');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(2 * Math.PI - angle);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    return offscreenCanvas;
}

function fitToContainer(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}