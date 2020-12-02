const T = require('taninsam');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(({ min, max, character, password }) => ({
        min,
        max,
        occurence: T.countCharacter(character)(password)
      }))
    )
    .chain(
      T.filter(
        ({ min, max, occurence }) => min <= occurence && occurence <= max
      )
    )
    .chain(T.length())
    .value();
};
