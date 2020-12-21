const { countOccupiedSeatsAtEquilibre } = require('./tools');
const { atMatrix, inMatrix } = require('../../tools');

module.exports = countOccupiedSeatsAtEquilibre({
  tolerantIndex: 4,
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
    return '#' === at(newCoord);
  };
}
