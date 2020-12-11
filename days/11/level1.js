const T = require('taninsam');
const { printLayout, nextGeneration, countOccupiedSeats } = require('./tools');

module.exports = function(input) {
  return T.chain(input)
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
            .chain(nextGeneration)
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
};
