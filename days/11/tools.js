const chalk = require('chalk');
const T = require('taninsam');
const { printMatrix, patternMatching, mapMatrix } = require('../../tools');

function findEquilibre({ tolerantIndex, countOccupiedSeatsAdjacent }) {
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
              .chain(
                nextGeneration({ tolerantIndex, countOccupiedSeatsAdjacent })
              )
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

function nextGeneration({ tolerantIndex, countOccupiedSeatsAdjacent }) {
  return matrix => {
    const counter = countOccupiedSeatsAdjacent(matrix);
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

module.exports = {
  printLayout,
  findEquilibre,
  countOccupiedSeats,
  nextGeneration
};
