const canvas = document.getElementById('globe');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'earth.jpg';

// constants 
const TIME_FACTOR = 60 * 60 * 5;
const OBS_DISTANCE = 1000;
const SUN_RADIUS = 100;
const EARTH_RADIUS = 50;
const MOON_RADIUS = 20;
const EARTH_DISTANCE = SUN_RADIUS + 250;
const MOON_DISTANCE = EARTH_RADIUS + 50;

// variable params for animation
var time = 0;
var sunX = 0, earthX = EARTH_DISTANCE, moonX = MOON_DISTANCE;
var sunY = 0, earthY = 0, moonY = 0;
var sunZ = 0, earthZ = 0, moonZ = 0;
var sunRadius = SUN_RADIUS;
var earthRadius = EARTH_RADIUS;
var moonRadius = MOON_RADIUS;


function drawGlobe(x, y, r) {
	ctx.beginPath();
	ctx.arc(canvas.width/2 + x, canvas.height/2 + y, r, 0, 2 * Math.PI);
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.fillStyle = 'white';
	ctx.fill();
}

function calculateOrbitDelta(t, period, offset=0) {
	return Math.cos(t/period * 2*Math.PI + offset);
}

function drawObjects() {
	var params = [
		[sunZ, sunX, sunY, sunRadius],
		[earthZ, earthX, earthY, earthRadius],
		[moonZ, moonX, moonY, moonRadius],
	];

	params.sort((a, b) => b[0] - a[0]);

	for (param of params) {
		drawGlobe(param[1], param[2], param[3]);
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw celestial bodies
	drawObjects();

	// update parameters
	sunX = sunX;
	sunY = sunY;
	sunRadius = sunRadius;

	let earthPeriod = 365.256 * 24 * 60 * 60;
	earthX = sunX + EARTH_DISTANCE * calculateOrbitDelta(time, earthPeriod);
	earthY = 0;
	earthZ = sunZ + EARTH_DISTANCE * calculateOrbitDelta(time, earthPeriod, Math.PI/2);
	earthRadius = EARTH_RADIUS * (OBS_DISTANCE - earthZ) / OBS_DISTANCE


	let moonPeriod = 29.5 * 24 * 60 * 60;	
	moonX = earthX + MOON_DISTANCE * calculateOrbitDelta(time, moonPeriod);
	moonY = earthY;
	moonZ = earthZ + MOON_DISTANCE * calculateOrbitDelta(time, moonPeriod, Math.PI/2);
	moonRadius = MOON_RADIUS * (OBS_DISTANCE - moonZ) / OBS_DISTANCE;

	time += TIME_FACTOR;

	requestAnimationFrame(draw);
}

draw();
