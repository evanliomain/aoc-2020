const T = require('taninsam');
const {
  pathToCoordinate,
  coordinatesToTiles,
  countBlackTiles,
  nextDay
} = require('./tools');

module.exports = function(paths) {
  return T.chain(paths)
    .chain(T.map(pathToCoordinate))
    .chain(coordinatesToTiles)
    .chain(T.loopFor(100, nextDay))
    .chain(countBlackTiles)
    .value();
};
