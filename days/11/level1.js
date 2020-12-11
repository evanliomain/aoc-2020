const T = require('taninsam');
const { findEquilibre } = require('./tools');
const { atMatrix } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(findEquilibre({ tolerantIndex: 4, countOccupiedSeatsAdjacent }))
    .value();
};

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
