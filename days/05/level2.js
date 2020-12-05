const T = require('taninsam');
const { findPlace, toSeatId } = require('./tools');

module.exports = function(input) {
  const seatIds = T.chain(input)
    .chain(T.map(findPlace))
    .chain(T.map(toSeatId))
    .chain(T.sort())
    .value();
  for (let i = 0; i < seatIds.length - 1; i++) {
    const seatId = seatIds[i];
    const nextSeatId = seatIds[i + 1];
    if (1 < nextSeatId - seatId) {
      return nextSeatId - 1;
    }
  }
  return 'Not Found';
};
