const { countOccupiedSeatsAtEquilibre } = require('./tools');
const { atMatrix, inMatrix } = require('../../tools');

module.exports = countOccupiedSeatsAtEquilibre({
  tolerantIndex: 5,
  isOccupiedSeats
});

function isOccupiedSeats(matrix) {
  const at = atMatrix(matrix);
  const isIn = inMatrix(matrix);
  return ({ x, y, dx, dy }) => {
    const newCoord = { x: x + dx, y: y + dy };
    if (!isIn(newCoord)) {
      return false;
    }
    const cell = at(newCoord);
    if ('#' === cell) {
      return true;
    }
    if ('L' === cell) {
      return false;
    }
    return isOccupiedSeats(matrix)({ ...newCoord, dx, dy });
  };
}
