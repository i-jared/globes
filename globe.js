const canvas = document.getElementById("globe");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

// constants
var timeFactor = 60 * 60 * 5;
// var timeFactor = 1;
const OBS_DISTANCE = 1000;

const SUN_RADIUS = 200;
const EARTH_RADIUS = 18.33;
const MOON_RADIUS = 5;
const MARS_RADIUS = 9.76;
const PHOBOS_RADIUS = 0.032;
const DEIMOS_RADIUS = 0.02;

const EARTH_DISTANCE = SUN_RADIUS + 150;
const MOON_DISTANCE = EARTH_RADIUS + 50;
const MARS_DISTANCE = SUN_RADIUS + 250;
const PHOBOS_DISTANCE = MARS_RADIUS + 5;
const DEIMOS_DISTANCE = MARS_RADIUS + 10;

class Body {
  static SUN = "sun";
  static EARTH = "earth";
  static MARS = "mars";
}

// variable params for animation
var time = 0;
// x, y, z, radius, orbit, period, distance
var bodyVars = {
  sun: {
    x: 0,
    y: 0,
    z: 0,
    r: SUN_RADIUS,
    true_r: SUN_RADIUS,
    orbit: null,
    period: 1,
    distance: 0,
  },
  earth: {
    x: 0,
    y: 0,
    z: 0,
    r: EARTH_RADIUS,
    true_r: EARTH_RADIUS,
    orbit: Body.SUN,
    period: 365.256 * 24 * 60 * 60,
    distance: EARTH_DISTANCE,
    image_src: "earth.jpg",
  },
  moon: {
    x: 0,
    y: 0,
    z: 0,
    r: MOON_RADIUS,
    true_r: MOON_RADIUS,
    orbit: Body.EARTH,
    period: 29.5 * 24 * 60 * 60,
    distance: MOON_DISTANCE,
  },
  mars: {
    x: 0,
    y: 0,
    z: 0,
    r: MARS_RADIUS,
    true_r: MARS_RADIUS,
    orbit: Body.SUN,
    period: 687 * 24 * 60 * 60,
    distance: MARS_DISTANCE,
  },
  phobos: {
    x: 0,
    y: 0,
    z: 0,
    r: PHOBOS_RADIUS,
    true_r: PHOBOS_RADIUS,
    orbit: Body.MARS,
    period: 7.67 * 60 * 60,
    distance: PHOBOS_DISTANCE,
  },
  deimos: {
    x: 0,
    y: 0,
    z: 0,
    r: DEIMOS_RADIUS,
    true_r: DEIMOS_RADIUS,
    orbit: Body.MARS,
    period: 30.25 * 60 * 60,
    distance: DEIMOS_DISTANCE,
  },
};

function drawGlobe(x, y, r, imageData) {
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, r, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.stroke();

  if (false) {
    // drawImage(x, y, r, imageData);
  } else {
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

function drawImage(bodyX, bodyY, radius, earthImage) {
}

function orbitFactor(t, period, offset = 0) {
  return Math.cos((t / period) * 2 * Math.PI + offset);
}

function drawObjects() {
  let values = Object.values(bodyVars);
  values.sort((a, b) => b["z"] - a["z"]);
  for (body of values) {
    drawGlobe(body.x, body.y, body.r, body.image_data);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw celestial bodies
  drawObjects();

  // update parameters
  for (let key in bodyVars) {
    let body = bodyVars[key];
    let primary = bodyVars[bodyVars[key].orbit];

    bodyVars[key].x = primary
      ? primary.x + body.distance * orbitFactor(time, body.period)
      : body.x;
    bodyVars[key].y = 0;
    bodyVars[key].z = primary
      ? primary.z + body.distance * orbitFactor(time, body.period, Math.PI / 2)
      : body.z;
    bodyVars[key].r = (body.true_r * (OBS_DISTANCE - body.z)) / OBS_DISTANCE;
  }

  time += timeFactor;

  // setTimeout(() => requestAnimationFrame(draw), 100);
  requestAnimationFrame(draw);
}

function initImages() {
  var offScreenCanvas = document.createElement("canvas");
  var offScreenCtx = offScreenCanvas.getContext("2d");

  for (let key in bodyVars) {
    let body = bodyVars[key];
    if (body.image_src) {
      body.image = new Image();
      body.image.src = body.image_src;

      body.image.onload = () => {
        offScreenCanvas.width = body.image.width;
        offScreenCanvas.height = body.image.height;

        offScreenCtx.drawImage(body.image, 0, 0);
        var imageData = offScreenCtx.getImageData(
          0,
          0,
          offScreenCanvas.width,
          offScreenCanvas.height
        );
        body.image_data = imageData;

        offScreenCtx.clearRect(
          0,
          0,
          offScreenCanvas.width,
          offScreenCanvas.height
        );
      };
    }
  }
}

function initListeners() {
  // increase timeFactor on scroll
  window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      timeFactor *= timeFactor < 1 ? 1.5 : 1.01;
    } else {
      timeFactor /= timeFactor < 1 ? 1.5 : 1.01;
    }
  });
}

initImages();
draw();
initListeners();
