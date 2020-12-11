/**
 * Return true if coordinate is in the matrix
 */
module.exports = function inMatrix(matrix) {
  const nbRow = matrix.length;
  const nbColumn = matrix[0].length;

  return ({ x, y }) => {
    if (-1 === y) {
      return false;
    }
    if (-1 === x) {
      return false;
    }
    if (nbRow <= y) {
      return false;
    }
    if (nbColumn <= x) {
      return false;
    }
    return true;
  };
};
