const T = require('taninsam');
const { parseLinesWithRegexp } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(parseLinesWithRegexp(/(?<action>[A-Z])(?<value>\d+)/))
    .chain(
      T.map(
        T.unless(
          ({ action, value }) => !('R' === action && 270 === value),
          () => ({ action: 'L', value: 90 })
        )
      )
    )
    .chain(
      T.map(
        T.unless(
          ({ action, value }) => !('L' === action && 270 === value),
          () => ({ action: 'R', value: 90 })
        )
      )
    )
    .value();
};
