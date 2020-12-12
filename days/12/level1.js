const { unless } = require('taninsam');
const T = require('taninsam');
const { patternMatchingBy, patternMatching, log } = require('../../tools');

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
            [
              'N',
              ({ previous, value }) => ({
                ...previous,
                n: previous.n + value
              })
            ],
            [
              'S',
              ({ previous, value }) => ({
                ...previous,
                n: previous.n - value
              })
            ],
            [
              'E',
              ({ previous, value }) => ({
                ...previous,
                e: previous.e + value
              })
            ],
            [
              'W',
              ({ previous, value }) => ({
                ...previous,
                e: previous.e - value
              })
            ],
            [
              'F',
              ({ previous, value }) => ({
                ...previous,
                ...forward(previous, value)
              })
            ],
            [
              'L',
              ({ previous, value }) => ({
                ...previous,
                facing: orient(previous.facing, action, value)
              })
            ],
            [
              'R',
              ({ previous, action, value }) => ({
                ...previous,
                facing: orient(previous.facing, action, value)
              })
            ]
          )({ previous, action, value }),
        { e: 0, n: 0, facing: 'e' }
      )
    )
    .chain(({ e, n }) => Math.abs(e) + Math.abs(n))
    .value();
};

function forward({ e, n, facing }, value) {
  return patternMatching(
    ['e', () => ({ e: e + value })],
    ['w', () => ({ e: e - value })],
    ['n', () => ({ n: n + value })],
    ['s', () => ({ n: n - value })]
  )(facing);
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
