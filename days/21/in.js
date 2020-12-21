const T = require('taninsam');
const { captureGroups } = require('../../tools');

module.exports = function(input) {
  return T.chain(input)
    .chain(
      T.map(
        captureGroups(
          /^(?<ingredients>((\w+) ?)+) \(contains (?<allergens>((\w+)(, )?)+)\)$/
        )
      )
    )
    .chain(
      T.map(({ ingredients, allergens }) => ({
        ingredients: ingredients.split(' '),
        allergens: allergens.split(', ')
      }))
    )
    .value();
};
