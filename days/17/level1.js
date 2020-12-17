const { getNeighbors3D, solve } = require('./tools');

module.exports = function(input) {
  return solve(getNeighbors3D)(input);
};
