const SUN_RADIUS = 200;
const EARTH_RADIUS = 18.33;
const MOON_RADIUS = 5;
const MARS_RADIUS = 9.76;
const PHOBOS_RADIUS = 0.032;
const DEIMOS_RADIUS = 0.02;
const MERCURY_RADIUS = 7;
const VENUS_RADIUS = 17;
const JUPITER_RADIUS = 101;
const IO_RADIUS = 10;
const EUROPA_RADIUS = 10;
const GANYMEDE_RADIUS = 10;
const CALLISTO_RADIUS = 10;

const EARTH_DISTANCE = SUN_RADIUS + 150;
const MOON_DISTANCE = EARTH_RADIUS + 50;
const MARS_DISTANCE = SUN_RADIUS + 250;
const PHOBOS_DISTANCE = MARS_RADIUS + 5;
const DEIMOS_DISTANCE = MARS_RADIUS + 10;
const MERCURY_DISTANCE = SUN_RADIUS + 10;
const VENUS_DISTANCE = SUN_RADIUS + 50;
const JUPITER_DISTANCE = SUN_RADIUS + 100;
const IO_DISTANCE = JUPITER_RADIUS + 20;
const EUROPA_DISTANCE = JUPITER_RADIUS + 30;
const GANYMEDE_DISTANCE = JUPITER_RADIUS + 40;
const CALLISTO_DISTANCE = JUPITER_RADIUS + 50;

class Body {
  static SUN = "sun";
  static EARTH = "earth";
  static MARS = "mars";
  static JUPITER = "jupiter";
}

// variable params for animation
export const bodyVars = {
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
  mercury: {
    x: 0,
    y: 0,
    z: 0,
    r: MERCURY_RADIUS,
    true_r: MERCURY_RADIUS,
    orbit: Body.SUN,
    period: 58.6 * 24 * 60 * 60,
    distance: MERCURY_DISTANCE,
  },
  venus: {
    x: 0,
    y: 0,
    z: 0,
    r: VENUS_RADIUS,
    true_r: VENUS_RADIUS,
    orbit: Body.SUN,
    period: 243 * 24 * 60 * 60,
    distance: VENUS_DISTANCE,
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
