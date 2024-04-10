const canvas = document.getElementById("globe");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "earth.jpg";

// constants
const TIME_FACTOR = 60 * 60 * 5;
const OBS_DISTANCE = 1000;

const SUN_RADIUS = 200;
const EARTH_RADIUS = 18.33;
const MOON_RADIUS = 5;
const MARS_RADIUS = 9.76;

const EARTH_DISTANCE = SUN_RADIUS + 150;
const MOON_DISTANCE = EARTH_RADIUS + 50;
const MARS_DISTANCE = SUN_RADIUS + 250;

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
};

function drawGlobe(x, y, r) {
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, r, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
}

function orbitFactor(t, period, offset = 0) {
  return Math.cos((t / period) * 2 * Math.PI + offset);
}

function drawObjects() {
  let values = Object.values(bodyVars);
  values.sort((a, b) => b["z"] - a["z"]);
  for (body of values) {
    drawGlobe(body["x"], body["y"], body["r"]);
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

    bodyVars[key].x =
      primary ? primary.x + body.distance * orbitFactor(time, body.period) : body.x;
    bodyVars[key].y = 0;
    bodyVars[key].z =
      primary ? primary.z +
      body.distance * orbitFactor(time, body.period, Math.PI / 2) : body.z;
    bodyVars[key].r = (body.true_r * (OBS_DISTANCE - body.z)) / OBS_DISTANCE;
  }

  time += TIME_FACTOR;

  
//   setTimeout(() => requestAnimationFrame(draw), 100);
  requestAnimationFrame(draw);
}

draw();
