const { getNeighbors4D, solve } = require('./tools');

module.exports = function(input) {
  return solve(getNeighbors4D)(input);
};
