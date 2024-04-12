import { bodyVars } from "./bodies.js";

const canvas = document.getElementById("globe");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

// constants
// TODO: add an initial zoom level, change planet distances/sizes to generic ratios
const UNIT_DISTANCE = 1000;
// const UNIT_VIEW = Math.PI / 2;
// variable params
// var fieldOfView = Math.PI / 4;
var obsDistance = UNIT_DISTANCE;
var obsAngle = 0;
var timeFactor = 60 * 60 * 5;
var time = 0;

function drawGlobe(x, y, r) {
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, r, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
}

function drawRing(innerRadius, outerRadius, x, y) {
  ctx.beginPath();
  ctx.lineWidth = outerRadius - innerRadius; // TODO: update this based on the angle of view. min 1, max outerRadius - innerRadius
  ctx.arc(
    canvas.width / 2 + x,
    canvas.height / 2 + y,
    (outerRadius + innerRadius) / 2,
    0, // TODO: update this based on where it will intersect with the planet
    2 * Math.PI // TODO: update this based on where it will intersect with the planet
  );
  ctx.stroke();
}

function orbitFactor(t, period, offset = 0) {
  return Math.cos((t / period) * 2 * Math.PI + offset);
}

function drawObjects() {
  let values = Object.values(bodyVars);
  values.sort((a, b) => b.z - a.z);
  for (let body of values) {
    // if (body.z + obsDistance > 0) {}
    drawGlobe(body.x, body.y, body.r);
    if (body.ring) {
      drawRing(body.ring.inner_radius, body.ring.outer_radius, body.x, body.y);
    }
  }
}

function draw() {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw celestial bodies
  drawObjects();

  // update parameters
  for (let key in bodyVars) {
    let body = bodyVars[key];
    let primary = bodyVars[body.orbit];

    body.distance = Math.max(
      1,
      (body.true_distance * (obsDistance - body.z) * UNIT_DISTANCE) /
        (obsDistance * obsDistance)
    );
    body.x = primary
      ? primary.x + body.distance * orbitFactor(time, body.period)
      : body.x;
    body.y =
      (primary ? primary.y : 0) +
      Math.sin(obsAngle) *
        (primary
          ? body.distance * orbitFactor(time, body.period, Math.PI / 2)
          : body.y);
    body.z =
      (primary ? primary.z : 0) +
      Math.cos(obsAngle) *
        (primary
          ? body.distance * orbitFactor(time, body.period, Math.PI / 2)
          : body.z);
    body.r = Math.max(
      0,
      (body.true_r * (obsDistance - body.z) * UNIT_DISTANCE) /
        (obsDistance * obsDistance)
    );
    // body.r = calculateSize(
    // body.true_r*2,
    // Math.sqrt((obsDistance + body.z) ** 2 + body.x * body.x),
    // canvasWidth
    // ) / 2;
  }

  time += timeFactor;

  // setTimeout(() => requestAnimationFrame(draw), 100);
  requestAnimationFrame(draw);
}

function calculateSize(diameter, distance, canvasWidth) {
  const angle = 2 * Math.atan(diameter / (2 * distance));
  return Math.max(1, (angle * canvasWidth) / fieldOfView);
}

function initListeners() {
  // increase obsAngle on scroll
  window.addEventListener("wheel", (e) => {
    //increase timefactor on shift + wheeel
    if (e.shiftKey) {
      timeFactor *= e.deltaY > 0 ? 1.02 : 1.0 / 1.02;
    } else if (e.metaKey) {
      obsDistance *= e.deltaY > 0 ? 1.02 : 1.0 / 1.02;
      // field of view ranges from 0 to 180 degrees
      // fieldOfView = Math.min(
      // Math.PI,
      // Math.max(0, (UNIT_VIEW * obsDistance) / UNIT_DISTANCE)
      // );
    } else if (e.deltaY > 0) {
      obsAngle += 0.02;
      obsAngle = Math.min(0, obsAngle);
    } else {
      obsAngle -= 0.02;
      obsAngle = Math.min(0, Math.max(-Math.PI / 2, obsAngle));
    }
  });
  window.addEventListener("DOMContentLoaded", function () {
    var changeTextElement = document.getElementById("changeText");
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      changeTextElement.textContent = "2-finger scroll to change speed";
    }
  });
  let startX = 0;
  let startY = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: false }
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      let deltaX = e.touches[0].clientX - startX;
      let deltaY = e.touches[0].clientY - startY;
      //increase timefactor on shift + wheeel
      if (e.touches.length > 1) {
        timeFactor *= deltaY > 0 ? 1.02 : 1.0 / 1.02;
      } else if (deltaY > 0) {
        obsAngle += 0.02;
        obsAngle = Math.min(0, obsAngle);
      } else {
        obsAngle -= 0.02;
        obsAngle = Math.min(0, Math.max(-Math.PI, obsAngle));
      }
    },
    { passive: false }
  );
}

draw();
initListeners();
