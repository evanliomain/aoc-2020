const T = require('taninsam');
const { replace } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(T.map(replace(/^(\d+)-(\d+) (.): (.*)$/, '$1/$2/$3/$4')))
    .chain(T.map(T.split('/')))
    .chain(
      T.map(([min, max, character, password]) => ({
        min: parseInt(min, 10),
        max: parseInt(max, 10),
        character,
        password
      }))
    )
    .value();
};
