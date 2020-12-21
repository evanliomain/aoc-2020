const T = require('taninsam');

module.exports = { getInertIngredients };

function getInertIngredients(foods) {
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

  const inertIngredients = new Set(
    T.chain(foods)
      .chain(T.map(({ ingredients }) => ingredients))
      .chain(T.flat())
      .value()
  );
  inertIngredients.forEach(safeIngredient => {
    if (allAllergensIngredients.has(safeIngredient)) {
      inertIngredients.delete(safeIngredient);
    }
  });
  return inertIngredients;
}
