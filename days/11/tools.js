const chalk = require('chalk');
const T = require('taninsam');
const {
  printMatrix,
  patternMatching,
  mapMatrix,
  atMatrix
} = require('../../tools');

function nextGeneration(matrix) {
  const counter = countOccupiedSeatsAdjacent(matrix);
  return mapMatrix((cell, x, y) =>
    rule({ cell, nbOccupiedSeatsAdjacent: counter({ x, y }), x, y })
  )(matrix);
}

function rule({ cell, nbOccupiedSeatsAdjacent, x, y }) {
  if ('L' === cell && 0 === nbOccupiedSeatsAdjacent) {
    return '#';
  }
  if ('#' === cell && 4 <= nbOccupiedSeatsAdjacent) {
    return 'L';
  }
  return cell;
}

const printLayout = printMatrix(
  patternMatching(
    ['.', () => chalk.bgBlack(' ')],
    ['L', () => chalk.bgBlue(' ')],
    ['#', () => chalk.bgRed(' ')],
    [() => chalk.bgRed.white('?')]
  )
);

const countOccupiedSeats = T.sumBy(
  T.sumBy(
    patternMatching(['.', () => 0], ['L', () => 0], ['#', () => 1], [() => 0])
  )
);

function countOccupiedSeatsAdjacent(matrix) {
  const counter = cell =>
    T.chain(cell)
      .chain(isOccupiedSeats(matrix))
      .chain(boolToInt)
      .value();
  return ({ x, y }) =>
    counter({ x: x - 1, y }) +
    counter({ x: x + 1, y }) +
    counter({ x, y: y - 1 }) +
    counter({ x, y: y + 1 }) +
    counter({ x: x - 1, y: y - 1 }) +
    counter({ x: x + 1, y: y - 1 }) +
    counter({ x: x - 1, y: y + 1 }) +
    counter({ x: x + 1, y: y + 1 });
}

function isOccupiedSeats(matrix) {
  return ({ x, y }) => {
    if (-1 === y) {
      return false;
    }
    if (-1 === x) {
      return false;
    }
    if (matrix.length <= y) {
      return false;
    }
    if (matrix[0].length <= x) {
      return false;
    }
    return '#' === atMatrix({ x, y })(matrix);
  };
}
function boolToInt(bool) {
  return bool ? 1 : 0;
}

module.exports = {
  printLayout,
  countOccupiedSeats,
  nextGeneration
};
