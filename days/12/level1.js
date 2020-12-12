const { patternMatching } = require('../../tools');
const { solve } = require('./tools');

module.exports = function(input) {
  return solve({
    start: { e: 0, n: 0, facing: 'e' },
    move,
    forward,
    turnLeft: turn,
    turnRight: turn
  })(input);
};

function move(orient, direction = 1) {
  return ({ previous, value }) => ({
    ...previous,
    [orient]: previous[orient] + direction * value
  });
}

function turn({ previous, action, value }) {
  return {
    ...previous,
    facing: orient(previous.facing, action, value)
  };
}

function forward() {
  return ({ previous, value }) => ({
    ...previous,
    ...patternMatching(
      ['e', () => ({ e: previous.e + value })],
      ['w', () => ({ e: previous.e - value })],
      ['n', () => ({ n: previous.n + value })],
      ['s', () => ({ n: previous.n - value })]
    )(previous.facing)
  });
}

function orient(facing, action, value) {
  if (180 === value) {
    return turnAround(facing);
  }
  if ('R' === action) {
    return turnR(facing);
  }
  if ('L' === action) {
    return turnL(facing);
  }
}
function turnR(facing) {
  return patternMatching(
    ['e', () => 's'],
    ['w', () => 'n'],
    ['n', () => 'e'],
    ['s', () => 'w']
  )(facing);
}
function turnL(facing) {
  return turnR(turnR(turnR(facing)));
}
function turnAround(facing) {
  return turnR(turnR(facing));
}
