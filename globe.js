import { bodyVars } from "./bodies.js";

const canvas = document.getElementById("globe");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");

// variable params
var obsDistance = 1000;
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

function orbitFactor(t, period, offset = 0) {
  return Math.cos((t / period) * 2 * Math.PI + offset);
}

function drawObjects() {
  let values = Object.values(bodyVars);
  values.sort((a, b) => b["z"] - a["z"]);
  for (let body of values) {
    drawGlobe(body.x, body.y, body.r);
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
    bodyVars[key].y =
      (primary ? primary.y : 1) +
      Math.sin(obsAngle) *
        (primary
          ? body.distance * orbitFactor(time, body.period, Math.PI / 2)
          : body.y);
    bodyVars[key].z = primary
      ? primary.z + body.distance * orbitFactor(time, body.period, Math.PI / 2)
      : body.z;
    bodyVars[key].r = (body.true_r * (obsDistance - body.z)) / obsDistance;
  }

  time += timeFactor;

  // setTimeout(() => requestAnimationFrame(draw), 100);
  requestAnimationFrame(draw);
}

function initListeners() {
  // increase obsAngle on scroll
  window.addEventListener("wheel", (e) => {
    //increase timefactor on shift + wheeel
    if (e.shiftKey) {
      timeFactor *= e.deltaY > 0 ? 1.05 : 1.0 / 1.05;
    }
    else if (e.deltaY > 0) {
      obsAngle += 0.03;
      obsAngle = Math.min(0, obsAngle);
    } else {
      obsAngle -= 0.03;
      obsAngle = Math.min(0, Math.max(-Math.PI / 2, obsAngle));
    }
  });
}

draw();
initListeners();
