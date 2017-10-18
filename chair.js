var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-div', { preload: preload, create: create});

function preload() {
    game.load.image('chair', 'chair.png');
}

function create() {
  game.stage.backgroundColor = "#FFFFFF";
  var r = 350;
  var N = 100;
  var xplus = 400;
  var yplus = 400;
  var s=[];
  var t=[];
  var l=2*Math.PI*r/N;
  l=Math.floor(l)-1;
  var style = { font: 'Source Sans Pro', fontWeight: 300, fontSize: '16px', fill: "#000000" };
  var theta=0;
  for (i = 0; i < N; i++) {
    var x = r*Math.cos(Math.PI/2+Math.PI*theta/180);
    var y = r*Math.sin(Math.PI/2+Math.PI*theta/180);
    s[i]=game.add.sprite(xplus+x, yplus+y, 'chair');
    // s[i].scale.setTo(l/600, l/600);
    s[i].scale.setTo(1/30, 1/30);
    s[i].anchor.set(0.5,0.5);
    s[i].x=xplus+x;
    s[i].y=yplus+y;
    s[i].angle+=theta;
    var x2 = (r+20)*Math.cos(Math.PI/2+Math.PI*theta/180);
    var y2 = (r+20)*Math.sin(Math.PI/2+Math.PI*theta/180);
    t[i] = game.add.text(xplus+x2, yplus+y2, i+1, style);
    t[i].anchor.set(0.5,0.5);
    t[i].x=xplus+x2;
    t[i].y=yplus+y2;
    theta-=360/N;
  }
}