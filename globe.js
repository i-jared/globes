import { bodyVars, Body } from "./bodies.js";

const canvas = document.getElementById("globe");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

// constants
const INITIAL_ZOOM = 0.1;
const UNIT_DISTANCE = 1000;
// const UNIT_VIEW = Math.PI / 2;
// variable params
// var fieldOfView = Math.PI / 4;
var obsDistance = UNIT_DISTANCE;
var obsAngle = 0;
var timeFactor = 60 * 60 * 5;
var time = 0;

function drawGlobe(x, y, r) {
  if (r > 0.5) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, r, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

function drawRing(innerRadius, outerRadius, x, y, r, trueR) {
  ctx.beginPath();

  const adjRadius = ((r / trueR) * (outerRadius + innerRadius)) / 2;
  const lineWidth = Math.sin(obsAngle) * adjRadius + 1;
  const hiddenAngle =
    -Math.tan(obsAngle) * ((r / trueR) * innerRadius) >= r
      ? 0
      : Math.cos(obsAngle) * 2 * Math.asin(r / adjRadius);

  const width = ((r / trueR) * (outerRadius + innerRadius)) / 2;
  const height = width * -Math.sin(obsAngle);
  const start = (-Math.PI + hiddenAngle) / 2;
  const end = (3 * Math.PI - hiddenAngle) / 2;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "rgb(220, 220, 220)";
  ctx.ellipse(
    canvas.width / 2 + x,
    canvas.height / 2 + y,
    width,
    height,
    0,
    start,
    end
  );
  ctx.stroke();
  ctx.strokeStyle = "black";
}

function orbitFactor(t, period, offset = 0) {
  return Math.cos((t / period) * 2 * Math.PI + offset);
}

function drawObjects() {
  let values = Object.values(bodyVars);
  values.sort((a, b) => b.z - a.z);
  for (let body of values) {
    if (body.r > 0 || body.orbit == Body.SUN || !body.orbit)
      drawGlobe(body.x, body.y, body.r);
    if (body.ring) {
      drawRing(
        body.ring.inner_distance,
        body.ring.outer_distance,
        body.x,
        body.y,
        body.r,
        body.true_r
      );
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
      (INITIAL_ZOOM *
        body.true_distance *
        (obsDistance - body.z) *
        UNIT_DISTANCE) /
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
      body.orbit == Body.SUN ? 0.51 : 0,
      (INITIAL_ZOOM * body.true_r * (obsDistance - body.z) * UNIT_DISTANCE) /
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
    var zoomTextElement = document.getElementById("zoomText");
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      changeTextElement.textContent = "2-finger scroll to change speed";
      zoomTextElement.textContent = "Pinch to zoom";
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
