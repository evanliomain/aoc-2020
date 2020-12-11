const chalk = require('chalk');
const T = require('taninsam');
const { printMatrix, patternMatching, mapMatrix } = require('../../tools');

function findEquilibre({ tolerantIndex, isOccupiedSeats }) {
  return input =>
    T.chain(input)
      .chain(matrix => ({
        matrix,
        previous: null,
        next: countOccupiedSeats(matrix)
      }))
      .chain(
        T.loopWhile(
          ({ previous, next }) => previous !== next,
          ({ matrix, next }) =>
            T.chain(matrix)
              .chain(nextGeneration({ tolerantIndex, isOccupiedSeats }))
              .chain(newMatrix => ({
                matrix: newMatrix,
                previous: next,
                next: countOccupiedSeats(newMatrix)
              }))
              .value()
        )
      )
      .chain(({ matrix }) => matrix)
      .chain(countOccupiedSeats)
      .value();
}

function nextGeneration({ tolerantIndex, isOccupiedSeats }) {
  return matrix => {
    const counter = countOccupiedSeatsAdjacent(isOccupiedSeats, matrix);
    return mapMatrix((cell, x, y) =>
      rule({
        tolerantIndex,
        cell,
        nbOccupiedSeatsAdjacent: counter({ x, y }),
        x,
        y
      })
    )(matrix);
  };
}

function rule({ cell, nbOccupiedSeatsAdjacent, tolerantIndex }) {
  if ('L' === cell && 0 === nbOccupiedSeatsAdjacent) {
    return '#';
  }
  if ('#' === cell && tolerantIndex <= nbOccupiedSeatsAdjacent) {
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

function countOccupiedSeatsAdjacent(isOccupiedSeats, matrix) {
  const counter = cell =>
    T.chain(cell)
      .chain(isOccupiedSeats(matrix))
      .chain(boolToInt)
      .value();
  return ({ x, y }) =>
    counter({ x, y, dx: -1, dy: 0 }) +
    counter({ x, y, dx: 1, dy: 0 }) +
    counter({ x, y, dx: 0, dy: -1 }) +
    counter({ x, y, dx: 0, dy: 1 }) +
    counter({ x, y, dx: -1, dy: -1 }) +
    counter({ x, y, dx: 1, dy: -1 }) +
    counter({ x, y, dx: -1, dy: 1 }) +
    counter({ x, y, dx: 1, dy: 1 });
}

function boolToInt(bool) {
  return bool ? 1 : 0;
}

module.exports = {
  printLayout,
  findEquilibre,
  countOccupiedSeats,
  nextGeneration
};
