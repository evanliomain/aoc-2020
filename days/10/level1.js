const T = require('taninsam');
const { lag } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.unshift(0))
    .chain(lag((a, b) => b - a))
    .chain(T.sortBy(x => x))
    .chain(T.push(3))
    .chain(
      T.reduce((acc, value) => ({ ...acc, [value]: 1 + acc[value] }), {
        1: 0,
        3: 0
      })
    )
    .chain(values => values[1] * values[3])
    .value();
};
