const T = require('taninsam');
const { patternMatchingBy } = require('../../tools');

module.exports = { solve };

function solve(parameters) {
  return input =>
    T.chain(input)
      .chain(nextDirection(parameters))
      .chain(distance)
      .value();
}

function nextDirection({ start, move, forward, turnLeft, turnRight }) {
  return T.reduce(
    groupArg(
      patternMatchingBy(
        ({ action }) => action,
        ['N', move('n')],
        ['S', move('n', -1)],
        ['E', move('e')],
        ['W', move('e', -1)],
        ['F', forward()],
        ['L', turnLeft],
        ['R', turnRight]
      )
    ),
    start
  );
}

function groupArg(f) {
  return (previous, actual) => f({ previous, ...actual });
}

function distance({ e, n }) {
  return Math.abs(e) + Math.abs(n);
}
