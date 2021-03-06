const T = require('taninsam');
const {
  pathToCoordinate,
  coordinatesToTiles,
  countBlackTiles
} = require('./tools');

module.exports = function(paths) {
  return T.chain(paths)
    .chain(T.map(pathToCoordinate))
    .chain(coordinatesToTiles)
    .chain(countBlackTiles)
    .value();
};
