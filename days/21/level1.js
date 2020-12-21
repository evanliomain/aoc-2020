const T = require('taninsam');

module.exports = function(foods) {
  const allAllergens = new Map();

  foods.forEach(({ ingredients, allergens }) => {
    allergens.forEach(allergen => {
      if (!allAllergens.has(allergen)) {
        allAllergens.set(allergen, ingredients);
      } else {
        allAllergens.set(
          allergen,
          allAllergens
            .get(allergen)
            .filter(ingredientWithAllergens =>
              ingredients.includes(ingredientWithAllergens)
            )
        );
      }
    });
  });

  const allAllergensIngredients = new Set();

  for (const allergens of allAllergens.values()) {
    allergens.forEach(allergen => allAllergensIngredients.add(allergen));
  }

  const safeIngredients = new Set(
    T.chain(foods)
      .chain(T.map(({ ingredients }) => ingredients))
      .chain(T.flat())
      .value()
  );
  safeIngredients.forEach(safeIngredient => {
    if (allAllergensIngredients.has(safeIngredient)) {
      safeIngredients.delete(safeIngredient);
    }
  });

  let counter = 0;
  foods.forEach(({ ingredients }) => {
    counter += ingredients.filter(ingredient => safeIngredients.has(ingredient))
      .length;
  });
  return counter;
};
