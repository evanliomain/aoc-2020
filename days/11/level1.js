const { findEquilibre } = require('./tools');
const { atMatrix, inMatrix } = require('../../tools');

module.exports = function(input) {
  return findEquilibre({ tolerantIndex: 4, isOccupiedSeats })(input);
};

function isOccupiedSeats(matrix) {
  const isIn = inMatrix(matrix);
  return ({ x, y, dx, dy }) => {
    const newCoord = { x: x + dx, y: y + dy };
    if (!isIn(newCoord)) {
      return false;
    }
    return '#' === atMatrix(newCoord)(matrix);
  };
}
