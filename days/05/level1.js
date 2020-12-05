const T = require('taninsam');
const { findPlace, toSeatId } = require('./tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(findPlace))
    .chain(T.map(toSeatId))
    .chain(T.max())
    .value();
};
