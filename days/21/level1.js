const T = require('taninsam');
const { getInertIngredients } = require('./tools');

module.exports = function(foods) {
  const inertIngredients = getInertIngredients(foods);

  return T.chain(foods)
    .chain(T.map(({ ingredients }) => ingredients))
    .chain(T.map(T.filter(ingredient => inertIngredients.has(ingredient))))
    .chain(T.map(T.length()))
    .chain(T.sum())
    .value();
};
