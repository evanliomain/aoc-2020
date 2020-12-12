const { unless } = require('taninsam');
const T = require('taninsam');
const { patternMatchingBy, log } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(
        unless(
          ({ action, value }) => !('R' === action && 270 === value),
          () => ({ action: 'L', value: 90 })
        )
      )
    )
    .chain(
      T.map(
        unless(
          ({ action, value }) => !('L' === action && 270 === value),
          () => ({ action: 'R', value: 90 })
        )
      )
    )
    .chain(
      T.reduce(
        (previous, { action, value }) =>
          patternMatchingBy(
            ({ action }) => action,
            ['N', moveWaypoint('n')],
            ['S', moveWaypoint('n', -1)],
            ['E', moveWaypoint('e')],
            ['W', moveWaypoint('e', -1)],
            ['L', turn(turnL)],
            ['R', turn(turnR)],
            ['F', forward]
          )({ previous, action, value }),
        { e: 0, n: 0, waypoint: { e: 10, n: 1 } }
      )
    )
    .chain(({ e, n }) => Math.abs(e) + Math.abs(n))
    .value();
};

function turn(fTurn) {
  return ({ previous, value }) => {
    if (180 === value) {
      return turnAround(previous);
    }
    return fTurn(previous);
  };
}

function forward({ previous, value }) {
  return {
    ...previous,
    e: previous.e + value * previous.waypoint.e,
    n: previous.n + value * previous.waypoint.n
  };
}

function moveWaypoint(orient, direction = 1) {
  return ({ previous, value }) => ({
    ...previous,
    waypoint: {
      ...previous.waypoint,
      [orient]: previous.waypoint[orient] + direction * value
    }
  });
}

function turnR(previous) {
  return {
    ...previous,
    waypoint: {
      e: previous.waypoint.n,
      n: -1 * previous.waypoint.e
    }
  };
}
function turnL(previous) {
  return turnR(turnR(turnR(previous)));
}
function turnAround(previous) {
  return turnR(turnR(previous));
}
