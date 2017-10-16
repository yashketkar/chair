var canvas;
var ctx;

function setupCanvas() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
    // var img = document.getElementById("scream");
    var base_image = new Image();
    base_image.onload = function()
    {
      // test that the image was loaded
      console.log(base_image);  // or console.log if you prefer
      ctx.translate(450, 450);
      // ctx.rotate(3*Math.PI/2);

      var theta=0;
      var alpha = Math.PI/2;
      for (i = 0; i < 40; i++) {
        var x = 400*Math.cos(alpha-theta);
        var y = 400*Math.sin(alpha-theta);
        console.log("alpha is:" + alpha + " and x,y is: " + x + ","+ y);
        ctx.save();
        ctx.rotate(2*Math.PI-theta);
        ctx.drawImage(base_image, x, y, 10, 10);
        ctx.restore();
        theta+=0.1;
      }

      ctx.drawImage(base_image, -10, -10, 20, 20);
    }
    base_image.src = "chair.svg";
};

function drawRotatedImage(image, x, y, angle)
{
    ctx.save();
    ctx.translate(-450, -450);
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(image, 0, 0, 10, 10);
    // ctx.translate(-x, -y);
    // ctx.translate(450, 450);
    console.log("angle is:" + angle + " and x,y is: " + x + ","+ y);

    ctx.restore();
}
