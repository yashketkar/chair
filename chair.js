var game = new Phaser.Game(800, 800, Phaser.CANVAS, 'phaser-div', { preload: preload, create: create});
var runButtonText = document.getElementById("runButton").firstChild;
var numberOfChairs = document.getElementById("numberOfChairs");
var intervalAmount = document.getElementById("intervalAmount");
var N = 100;
var interval = 200;
var index;
var count;
var previousEvent;
var chairs = Array.apply(null, Array(N)).map(function (_, i) {return i+1;});
var running = false;

function preload() {
    // game.load.image('chair', 'chair.png');
    game.load.image('chair', 'https://media1.popsugar-assets.com/static/imgs/interview/chair.png');
}

function create() {
  game.stage.backgroundColor = "#FFFFFF";
  drawChairs(100);
}

function drawChairs(N) {
  var r = 350;
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
    t[i] = game.add.text(xplus+x2, yplus+y2, chairs[i], style);
    t[i].anchor.set(0.5,0.5);
    t[i].x=xplus+x2;
    t[i].y=yplus+y2;
    theta-=360/N;
  }
}

function runSimulation() {
    if (runButtonText.data=="Run Simulation" && running == true){
        runButtonText.data = "Pause Simulation";
        game.time.events.resume();
    }
    else if (runButtonText.data == "Pause Simulation" &&running==true) {
        runButtonText.data = "Run Simulation";
        game.time.events.pause();
    } else {
    // N=(numberOfChairs.value);
    console.log(N);
    index=0;
    count=1;
    runButtonText.data = "Pause Simulation";
    game.time.events.remove(previousEvent);
    previousEvent = game.time.events.repeat(interval, N-1, removeChair, this);
    running = true;
    }
}

function removeChair() {
    game.world.removeAll();
    N-=1;
    chairs.splice(index, 1);
    console.log(chairs);
    index+=count;
    index=index%chairs.length;
    count+=1;
    drawChairs(N);
    if(N==1){
        running = false;
        runButtonText.data = "Run Simulation";
    }
}

function updateN(newN) {
    N=parseInt(newN);
    chairs = Array.apply(null, Array(N)).map(function (_, i) {return i+1;});
    game.time.events.removeAll();
    game.world.removeAll();
    running=false;
    runButtonText.data = "Run Simulation";
    drawChairs(N);
}

function updateInterval(newInterval) {
    interval = newInterval;
    if(running){
        game.time.events.remove(previousEvent);
        previousEvent = game.time.events.repeat(interval, N, removeChair, this);
    }
}

function resetState(){
    numberOfChairs.value = 100;
    updateN(100);
    intervalAmount.value = 200;
    updateInterval(200);
    // game.time.events.removeAll();
    // running=false;
    // runButtonText.data = "Run Simulation";
    index = 0;
    count = 1;
}
