const T = require('taninsam');
const { getInertIngredients } = require('./tools');

module.exports = function(foods) {
  const inertIngredients = getInertIngredients(foods);

  const allergenIngredients = foods.map(({ ingredients, allergens }) => ({
    allergens,
    ingredients: ingredients.filter(
      ingredient => !inertIngredients.has(ingredient)
    )
  }));

  const ingredientsMap = new Map();

  allergenIngredients.forEach(({ allergens, ingredients }) => {
    allergens.forEach(allergen => {
      if (!ingredientsMap.has(allergen)) {
        ingredientsMap.set(allergen, new Set(ingredients));
      } else {
        const possiblesAllergens = ingredientsMap.get(allergen);
        possiblesAllergens.forEach(possibleAllergen => {
          if (!ingredients.includes(possibleAllergen)) {
            possiblesAllergens.delete(possibleAllergen);
          }
        });
      }
    });
  });

  const foundAllergens = new Set();

  while (!hasFoundAssociation(ingredientsMap)) {
    ingredientsMap.forEach(ingredients => {
      if (1 === ingredients.size) {
        foundAllergens.add(ingredients.values().next().value);
      } else {
        ingredients.forEach(ingredient => {
          if (foundAllergens.has(ingredient)) {
            ingredients.delete(ingredient);
          }
        });
      }
    });
  }

  return T.chain([...ingredientsMap])
    .chain(
      T.map(([key, values]) => ({ ingredient: [...values][0], allergen: key }))
    )
    .chain(T.sortBy(({ allergen }) => allergen))
    .chain(T.map(({ ingredient }) => ingredient))
    .chain(T.join(','))
    .value();
};

function hasFoundAssociation(ingredientsMap) {
  let result = true;
  ingredientsMap.forEach(ingredients => {
    if (1 < ingredients.size) {
      result = false;
    }
  });
  return result;
}
