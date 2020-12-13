const T = require('taninsam');
const { equal, parseNumber } = require('../../tools');

module.exports = function({ timestamp, busIDs }) {
  return T.chain(busIDs)
    .chain(filter(T.not(equal('x'))))
    .chain(map(parseNumber()))
    .chain(
      T.map(id => ({
        id,
        gap: (Math.floor(timestamp / id) + 1) * id - timestamp
      }))
    )
    .chain(T.sortBy(({ gap }) => gap))
    .chain(T.head())
    .chain(({ id, gap }) => id * gap)
    .value();
};
