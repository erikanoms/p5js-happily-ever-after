let upperSky;
let lowerSky;
let y;
const fireworks = [];
let gravity;
let song;
let img;
let tink;
let tinkX = 0;
let tinkY = 0;

function preload() {
  img = loadImage(
    "77-771163_free-disneyland-castle-clipart-disney-castle-logo-png.png"
  );
  tink = loadImage("output-onlinepngtools (2).png");
  song = loadSound(
    "_Happily Ever After_ Theme Song (FULL Soundtrack Version).mp3"
  );
}

function setup() {
  createCanvas(600, 400);
  song.loop();
  //vector pointing down
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);
  background(0);
}

//make Tinkerbell appear if mouse is pressed
function mousePressed() {
  tinkX = mouseX;
  tinkY = mouseY;
}

//make Tinkerbell move as mouse is dragged
function mouseDragged() {
  if (mouseX > tinkX - 100 && mouseX < tinkX + 100) {
    if (mouseY > tinkY - 100 && mouseY < tinkY + 100) {
      tinkX = mouseX;
      tinkY = mouseY;
    }
  }
}

function draw() {
  //gradient background
  upperSky = color("#070B34");
  lowerSky = color("#855988");
  setGradient(upperSky, lowerSky);

  //castle
  imageMode(CENTER);
  image(img, width / 2, height / 2 + 30);
  img.resize(250, 250);

  //tinkerbell
  image(tink, tinkX, tinkY, 50, 50);

  //curved hill
  noStroke();
  fill("#2f3b20");
  beginShape();
  curveVertex(0, height);
  curveVertex(0, height);
  curveVertex(width / 2 - 100, height - 50);
  curveVertex(width / 2 + 100, height - 50);
  curveVertex(width, height);
  curveVertex(width, height);
  endShape();

  //text
  textFont("Georgia");
  fill(255);
  textAlign(CENTER);
  text(
    "press a mousebutton and drag it to make tinkerbell fly!",
    width / 2,
    380
  );

//fireworks
//reference: coding challenge #27 fireworks
//https://thecodingtrain.com/CodingChallenges/027-fireworks.html
  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    //remove particle if finished
    if (fireworks[i].finished()) {
      fireworks.splice(i, 1);
    }
  }
}

//set background gradient night sky
function setGradient(upperSky, lowerSky) {
  for (y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(upperSky, lowerSky, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
