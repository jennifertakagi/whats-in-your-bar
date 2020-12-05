const DrinkModel = require('../models/DrinkModel');

/**
 * Gets all drinks' ingredients from database
 * @returns {Object{}}
 */
async function getIngredientsFromDB() {
  const matchGroup = { $group: { _id: '$ingredients' } };
  const matchSort = { $sort: { _id: 1 } };
  const allIngredientsDB = await DrinkModel.aggregate([matchGroup, matchSort]);
  const allIngredients = allIngredientsDB.reduce(
    (listIngredients, ingredient) => {
      if (ingredient && ingredient._id) {
        listIngredients.push(...ingredient._id);
      }
      return listIngredients;
    },
    [],
  );
  const sortedIngredients = Array.from(new Set(allIngredients)).sort();

  return sortedIngredients;
}

async function getDrinksByIngredientsFromDB(ownIngredients) {
  const queryIngredients = ownIngredients.map(ingredient => ({
    ingredients: ingredient,
  }));
  const drinksDB = await DrinkModel.find({ $or: queryIngredients });

  return drinksDB;
}

module.exports = {
  getIngredientsFromDB,
  getDrinksByIngredientsFromDB,
};
