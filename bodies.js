const SUN_RADIUS = 2000;
const EARTH_RADIUS = 18.33;
const MOON_RADIUS = 5;
const MARS_RADIUS = 9.76;
const PHOBOS_RADIUS = 0.032;
const DEIMOS_RADIUS = 0.02;
const MERCURY_RADIUS = 7;
const VENUS_RADIUS = 17;
const JUPITER_RADIUS = 201;
const IO_RADIUS = 5.25;
const EUROPA_RADIUS = 4.49;
const GANYMEDE_RADIUS = 7.57;
const CALLISTO_RADIUS = 7.4;
const SATURN_RADIUS = 167;
const URANUS_RADIUS = 72.9;
const NEPTUNE_RADIUS = 70.5;

const EARTH_DISTANCE = SUN_RADIUS + 150;
const MOON_DISTANCE = EARTH_RADIUS + 50;
const MARS_DISTANCE = SUN_RADIUS + 250;
const PHOBOS_DISTANCE = MARS_RADIUS + 5;
const DEIMOS_DISTANCE = MARS_RADIUS + 10;
const MERCURY_DISTANCE = SUN_RADIUS + 20;
const VENUS_DISTANCE = SUN_RADIUS + 50;
const JUPITER_DISTANCE = SUN_RADIUS + 700;
const GANYMEDE_DISTANCE = JUPITER_RADIUS + 70;
const IO_DISTANCE = JUPITER_RADIUS + 20;
const EUROPA_DISTANCE = JUPITER_RADIUS + 40;
const CALLISTO_DISTANCE = JUPITER_RADIUS + 200;
const SATURN_DISTANCE = SUN_RADIUS + 1500;
const URANUS_DISTANCE = SUN_RADIUS + 2500;
const NEPTUNE_DISTANCE = SUN_RADIUS + 4500;

const SUN_PERIOD = 1;
const MERCURY_PERIOD = 58.6 * 24 * 60 * 60;
const VENUS_PERIOD = 243 * 24 * 60 * 60;
const MARS_PERIOD = 687 * 24 * 60 * 60;
const EARTH_PERIOD = 365.256 * 24 * 60 * 60;
const MOON_PERIOD = 29.5 * 24 * 60 * 60;
const JUPITER_PERIOD = 4333 * 24 * 60 * 60;
const PHOBOS_PERIOD = 7.67 * 60 * 60;
const DEIMOS_PERIOD = 30.25 * 60 * 60;
const IO_PERIOD = 42.5 * 60 * 60;
const EUROPA_PERIOD = 3.5 * 24 * 60 * 60;
const GANYMEDE_PERIOD = 7.155 * 24 * 60 * 60;
const CALLISTO_PERIOD = 16.689 * 24 * 60 * 60;
const SATURN_PERIOD = 10756 * 24 * 60 * 60;
const URANUS_PERIOD = 30688 * 24 * 60 * 60;
const NEPTUNE_PERIOD = 60182 * 24 * 60 * 60;

export class Body {
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
    period: SUN_PERIOD,
    distance: 0,
    true_distance: 0,
  },
  mercury: {
    x: 0,
    y: 0,
    z: 0,
    r: MERCURY_RADIUS,
    true_r: MERCURY_RADIUS,
    orbit: Body.SUN,
    period: MERCURY_PERIOD,
    distance: MERCURY_DISTANCE,
    true_distance: MERCURY_DISTANCE,
  },
  venus: {
    x: 0,
    y: 0,
    z: 0,
    r: VENUS_RADIUS,
    true_r: VENUS_RADIUS,
    orbit: Body.SUN,
    period: VENUS_PERIOD,
    distance: VENUS_DISTANCE,
    true_distance: VENUS_DISTANCE,
  },
  earth: {
    x: 0,
    y: 0,
    z: 0,
    r: EARTH_RADIUS,
    true_r: EARTH_RADIUS,
    orbit: Body.SUN,
    period: EARTH_PERIOD,
    distance: EARTH_DISTANCE,
    true_distance: EARTH_DISTANCE,
  },
  moon: {
    x: 0,
    y: 0,
    z: 0,
    r: MOON_RADIUS,
    true_r: MOON_RADIUS,
    orbit: Body.EARTH,
    period: MOON_PERIOD,
    distance: MOON_DISTANCE,
    true_distance: MOON_DISTANCE,
  },
  mars: {
    x: 0,
    y: 0,
    z: 0,
    r: MARS_RADIUS,
    true_r: MARS_RADIUS,
    orbit: Body.SUN,
    period: MARS_PERIOD,
    distance: MARS_DISTANCE,
    true_distance: MARS_DISTANCE,
  },
  phobos: {
    x: 0,
    y: 0,
    z: 0,
    r: PHOBOS_RADIUS,
    true_r: PHOBOS_RADIUS,
    orbit: Body.MARS,
    period: PHOBOS_PERIOD,
    distance: PHOBOS_DISTANCE,
    true_distance: PHOBOS_DISTANCE,
  },
  deimos: {
    x: 0,
    y: 0,
    z: 0,
    r: DEIMOS_RADIUS,
    true_r: DEIMOS_RADIUS,
    orbit: Body.MARS,
    period: DEIMOS_PERIOD,
    distance: DEIMOS_DISTANCE,
    true_distance: DEIMOS_DISTANCE,
  },
  jupiter: {
    x: 0,
    y: 0,
    z: 0,
    r: JUPITER_RADIUS,
    true_r: JUPITER_RADIUS,
    orbit: Body.SUN,
    period: JUPITER_PERIOD,
    distance: JUPITER_DISTANCE,
    true_distance: JUPITER_DISTANCE,
  },
  io: {
    x: 0,
    y: 0,
    z: 0,
    r: IO_RADIUS,
    true_r: IO_RADIUS,
    orbit: Body.JUPITER,
    period: IO_PERIOD,
    distance: IO_DISTANCE,
    true_distance: IO_DISTANCE,
  },
  europa: {
    x: 0,
    y: 0,
    z: 0,
    r: EUROPA_RADIUS,
    true_r: EUROPA_RADIUS,
    orbit: Body.JUPITER,
    period: EUROPA_PERIOD,
    distance: EUROPA_DISTANCE,
    true_distance: EUROPA_DISTANCE,
  },
  ganymede: {
    x: 0,
    y: 0,
    z: 0,
    r: GANYMEDE_RADIUS,
    true_r: GANYMEDE_RADIUS,
    orbit: Body.JUPITER,
    period: GANYMEDE_PERIOD,
    distance: GANYMEDE_DISTANCE,
    true_distance: GANYMEDE_DISTANCE,
  },
  callisto: {
    x: 0,
    y: 0,
    z: 0,
    r: CALLISTO_RADIUS,
    true_r: CALLISTO_RADIUS,
    orbit: Body.JUPITER,
    period: CALLISTO_PERIOD,
    distance: CALLISTO_DISTANCE,
    true_distance: CALLISTO_DISTANCE,
  },
  saturn: {
    x: 0,
    y: 0,
    z: 0,
    r: SATURN_RADIUS,
    true_r: SATURN_RADIUS,
    orbit: Body.SUN,
    period: SATURN_PERIOD,
    distance: SATURN_DISTANCE,
    true_distance: SATURN_DISTANCE,
    ring: {
      inner_distance: SATURN_RADIUS + 100,
      outer_distance: SATURN_RADIUS + 200,
    },
  },
  uranus: {
    x: 0,
    y: 0,
    z: 0,
    r: URANUS_RADIUS,
    true_r: URANUS_RADIUS,
    orbit: Body.SUN,
    period: URANUS_PERIOD,
    distance: URANUS_DISTANCE,
    true_distance: URANUS_DISTANCE,
    ring: {
      inner_distance: URANUS_RADIUS + 100,
      outer_distance: URANUS_RADIUS + 200,
    },
  },
  neptune: {
    x: 0,
    y: 0,
    z: 0,
    r: NEPTUNE_RADIUS,
    true_r: NEPTUNE_RADIUS,
    orbit: Body.SUN,
    period: NEPTUNE_PERIOD,
    distance: NEPTUNE_DISTANCE,
    true_distance: NEPTUNE_DISTANCE,
  },
};
