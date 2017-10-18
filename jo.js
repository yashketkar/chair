
var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-div', { preload: preload, create: create , update:update, render:render});

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.

    // active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

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

var cursors;

function create() {
  game.stage.backgroundColor = "#FFFFFF";

  var xplus = 400;
  var yplus = 400;
  var test1 = game.add.sprite(xplus+0, yplus+0, 'chair');
  test1.scale.setTo(0.05, 0.05);
  test1.x=400-15;
  test1.y=400-15;

  var s=[];
  var t=[];
  var r = 350;
  var c=2*Math.PI*r;
  var l=c/100;
  l=Math.floor(l);
  console.log(l);
  var style = { font: "16px Courier", fill: "#000000" };
  var theta=0;
  for (i = 0; i < 100; i++) {
    var x = r*Math.cos(Math.PI/2+Math.PI*theta/180);
    var y = r*Math.sin(Math.PI/2+Math.PI*theta/180);
    s[i]=game.add.sprite(xplus+x, yplus+y, 'chair');
    s[i].scale.setTo(1/30, 1/30);
    s[i].anchor.set(0.5,0.5);
    s[i].x=xplus+x;
    s[i].y=yplus+y;
    // s[i].angle+=(theta*180/Math.PI);
    s[i].angle+=theta;
    var x2 = (r+20)*Math.cos(Math.PI/2+Math.PI*theta/180);
    var y2 = (r+20)*Math.sin(Math.PI/2+Math.PI*theta/180);
    t[i] = game.add.text(xplus+x2, yplus+y2, i, style);
    t[i].anchor.set(0.5,0.5);
    t[i].x=xplus+x2;
    t[i].y=yplus+y2;
    // t[i].angle+=theta;
    // t[i].alignTo(s[i], Phaser.BOTTOM_CENTER, 0,0);
    theta+=3.6;
  }
}

function update() {
}

function render() {
}
