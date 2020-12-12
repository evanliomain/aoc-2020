const { solve } = require('./tools');

module.exports = function(input) {
  return solve({
    start: { e: 0, n: 0, waypoint: { e: 10, n: 1 } },
    move,
    forward,
    turnLeft: turn(turnL),
    turnRight: turn(turnR)
  })(input);
};

function turn(fTurn) {
  return ({ previous, value }) => {
    if (180 === value) {
      return turnAround(previous);
    }
    return fTurn(previous);
  };
}

function forward() {
  return ({ previous, value }) => ({
    ...previous,
    e: previous.e + value * previous.waypoint.e,
    n: previous.n + value * previous.waypoint.n
  });
}

function move(orient, direction = 1) {
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
