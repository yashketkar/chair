
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-div', { preload: preload, create: create });

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Source Sans Pro', 'serif']
    }
};

function preload() {
    //  Load the Google WebFont Loader script
    game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    game.load.image('chair', 'chair.png');
}

function create() {
  //  Make our game world 2000x2000 pixels in size (the default is to match the game size)
  game.world.setBounds(0, 0, 1000, 1000);

  game.camera.x += 400;
  game.camera.y += 400;

  game.stage.backgroundColor = "#FFFFFF";

  var test = game.add.sprite(0, 0, 'chair');
  //  Set the scale of the sprite to the random value
  var theta=0;
  for (i = 0; i < 0; i++) {
           var x = 350 * Math.cos(alpha - theta);
           var y = 350 * Math.sin(alpha - theta);
           rot_image = rotateAndCache(base_image, theta)
           ctx.drawImage(rot_image, x, y, 18, 18);
           var x2 = 375 * Math.cos(alpha - theta);
           var y2 = 375 * Math.sin(alpha - theta);
           ctx.font = "16px Source Sans Pro";
           ctx.fillText(i+1,x2,y2);
           theta += Math.PI/50;
       }

  test.scale.setTo(0.1, 0.1);
  console.log(test);
  console.log(test.scale);
}

function createText() {
    text = game.add.text(game.world.centerX, game.world.centerY, "google web fonts demo");
    text.font = 'Source Sans Pro';
    text.fontSize = 16;
    //  x0, y0 - x1, y1
    text.align = 'center';
    text.inputEnabled = true;
    text.input.enableDrag();
    text.events.onInputOver.add(over, this);
    text.events.onInputOut.add(out, this);
}

function out() {
}

function over() {
    text.fill = '#ff00ff';
}
