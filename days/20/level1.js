const T = require('taninsam');

module.exports = function(tiles) {
  return T.chain(tiles)
    .chain(T.filter(({ nbMatch }) => 2 === nbMatch))
    .chain(T.map(({ id }) => id))
    .chain(T.reduce((a, b) => a * b, 1))
    .value();
};
