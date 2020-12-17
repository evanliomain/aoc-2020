const T = require('taninsam');
const { arrayToMap } = require('./tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(T.split('')))
    .chain(
      T.map((line, y) => line.map((value, x) => ({ x, y, z: 0, w: 0, value })))
    )
    .chain(T.flat())
    .chain(T.filter(({ value }) => '#' === value))
    .chain(arrayToMap)
    .value();
};
