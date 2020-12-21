const T = require('taninsam');
const { getInertIngredients } = require('./tools');

module.exports = function(foods) {
  return T.chain(foods)
    .chain(getIngredientsAllergensMapping)
    .chain(T.sortBy(({ allergen }) => allergen))
    .chain(T.map(({ ingredient }) => ingredient))
    .chain(T.join(','))
    .value();
};

function getIngredientsAllergensMapping(foods) {
  const inertIngredients = getInertIngredients(foods);

  const ingredientsMap = new Map();

  foods
    .map(({ ingredients, allergens }) => ({
      allergens,
      ingredients: ingredients.filter(
        ingredient => !inertIngredients.has(ingredient)
      )
    }))
    .forEach(({ allergens, ingredients }) => {
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
  return [...ingredientsMap].map(([key, values]) => ({
    ingredient: [...values][0],
    allergen: key
  }));
}

function hasFoundAssociation(ingredientsMap) {
  let result = true;
  ingredientsMap.forEach(ingredients => {
    if (1 < ingredients.size) {
      result = false;
    }
  });
  return result;
}
