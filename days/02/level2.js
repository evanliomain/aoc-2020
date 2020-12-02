const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(({ min, max, character, password }) => ({
        isAtMin: character === password[min - 1],
        isAtMax: character === password[max - 1]
      }))
    )
    .chain(
      T.map(
        ({ isAtMin, isAtMax }) => (isAtMin && !isAtMax) || (!isAtMin && isAtMax)
      )
    )
    .chain(T.filter(isValid => isValid))
    .chain(T.length())
    .value();
};
