// Click and Drag an object

let bodyparts;
let heldBodypart;
let stars;
var cameraImage;
let cnv;
let lispo;
let myFont;

function preload() {
  lispo = loadStrings('images/lispo.txt', doText);
  myFont = loadFont('images/PFGaramondClassic-OsFReg.ttf');
}

function doText(data) {
  lispo = data;
}


function setup() {

  cnv = createCanvas(1920, 1080);

  cameraImage = new Bodypart("images/camera3.png", 1500, 865);
  stars = loadImage ("images/stars.png");
  heldBodypart = null;
  bodyparts = [];

  bodyparts.push(new Bodypart("images/bear-ears.png", 720, 450));
  bodyparts.push(new Bodypart("images/bear-nose.png", 690, 540));
  bodyparts.push(new Bodypart("images/boobs.png", 530, 830));
  bodyparts.push(new Bodypart("images/cat-legs.png", 470, 466));
  bodyparts.push(new Bodypart("images/cat-nose.png", 340, 650));
  bodyparts.push(new Bodypart("images/chicken-legs.png", 470, 240));
  bodyparts.push(new Bodypart("images/cute-fish.png", 340, 550));
  bodyparts.push(new Bodypart("images/dolphin.png", 820, 370));
  bodyparts.push(new Bodypart("images/eagle.png", 340, 240));
  bodyparts.push(new Bodypart("images/elephant.png", 435, 590));
  bodyparts.push(new Bodypart("images/eyes-2.png", 340, 510));
  bodyparts.push(new Bodypart("images/eyes-3.png", 810, 760));
  bodyparts.push(new Bodypart("images/eyes.png", 630, 340));
  bodyparts.push(new Bodypart("images/femme.png", 590, 370));
  bodyparts.push(new Bodypart("images/foot.png", 600, 240));
  bodyparts.push(new Bodypart("images/giraffe.png", 820, 620));
  bodyparts.push(new Bodypart("images/hand.png", 730, 480));
  bodyparts.push(new Bodypart("images/head.png", 720, 250));
  bodyparts.push(new Bodypart("images/horsey.png", 820, 230));
  bodyparts.push(new Bodypart("images/legs.png", 360, 350));
  bodyparts.push(new Bodypart("images/lips.png", 860, 830));
  bodyparts.push(new Bodypart("images/nose.png", 420, 550));
  bodyparts.push(new Bodypart("images/parrot-wings.png", 670, 720));
  bodyparts.push(new Bodypart("images/pig-tail.png", 750, 830));
  bodyparts.push(new Bodypart("images/torso.png", 340, 690));
}

function draw() {
  background ('white');
  stroke(255, 204, 0);
strokeWeight(2);
noFill();
  rect(10, 10, 1900, 1060, 20);
  noStroke();
  var bodypartIsHovered = false;
  for (let index = bodyparts.length - 1; index >= 0; index--) {
    if (bodyparts[index].isHovered()) {
      bodypartIsHovered = true;
      break;
    }
  }
  if (cameraImage.isHovered() && heldBodypart === null ) {
    cursor(HAND);
  } else if ((bodypartIsHovered || heldBodypart !== null)) {
    cursor(MOVE);
  } else {
    cursor(ARROW);
  }

  if (heldBodypart !== null ) {
    heldBodypart.move(mouseX - pmouseX, mouseY - pmouseY);
  }


  image(stars, 300, 200);

  for (let index = 0; index < bodyparts.length; index++) {
    bodyparts[index].draw();
  }
  cameraImage.draw();
  if (heldBodypart !== null) {
    heldBodypart.draw();
  }


  fill('#00A99D');
  textFont(myFont);
  for (var i = 0; i < lispo.length; i++) {
    //textAlign(windowWidth/2, windowHeight/2);
    textSize(18);
    text(lispo[i], 1100, 250+i*20);
  }
  textSize(16);
  text('το κενό είναι η αρχή', 1360, 896);
}

function mousePressed() {
  if (mouseButton === LEFT && cameraImage.isHovered()) {
    saveCanvas("lispoanthropos", "png");
  } else if (mouseButton === LEFT) {
    for (let index = bodyparts.length - 1; index >= 0; index--) {
      if (bodyparts[index].isHovered()) {
        heldBodypart = bodyparts[index];
        bodyparts.splice(index, 1);
        break;
      }
    }
  }
}

function mouseReleased() {
  if (mouseButton === LEFT && heldBodypart !== null) {

    bodyparts.push(heldBodypart);
    heldBodypart = null;
  }
}

function keyPressed() {
  if (key === ' ') {
    clear();
    setup();
  } else if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
