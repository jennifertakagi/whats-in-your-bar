const servicesDB = require('../services/drinkService');

/**
 * Filter drinks by ingredients that user has,
 * returning only the drinks that the use can make (that has all user's ingredients)
 * @param {Array} ownIngredients the ingredients that user has
 * @param {Object[]} drinksDB all the drinks that includes at least one user's ingredient
 * @returns {Object[]} drinks that user can make
 */
function filterDrinks(ownIngredients, drinksDB) {
  return drinksDB.filter(ingredientsByDrink =>
    ingredientsByDrink.ingredients
      .map(item => ownIngredients.includes(item))
      .every(ingredient => ingredient),
  );
}

class DrinkController {
  /**
   * Gets all drinks' ingredients from database
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async getAllIngredients(request, response, next) {
    try {
      const ingredientsDB = await servicesDB.getIngredientsFromDB();

      response.send({
        status: 'ok',
        size: ingredientsDB.length,
        ingredients: ingredientsDB,
      });

      logger.info(
        `GET /drinks/allIngredients - ${JSON.stringify(ingredientsDB)}`,
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Gets drinks from database that has all the ingredients that user has
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async getDrinksByIngredients(request, response, next) {
    try {
      const { ingredients, limitSearch } = request.query;
      const ownIngredients = ingredients.split(',');
      const drinksDB = await servicesDB.getDrinksByIngredientsFromDB(
        ownIngredients,
      );
      const possibleDrinks = limitSearch === 'true'
        ? await filterDrinks(ownIngredients, drinksDB)
        : drinksDB;

      response.send({
        status: 'ok',
        size: possibleDrinks.length,
        drinks: possibleDrinks,
      });

      logger.info(`GET /drinks/ - ${JSON.stringify(possibleDrinks)}`);
    } catch (error) {
      next(error);
    }
  }

    /**
   * Gets a random drinks from database
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
   async getRandomDrink(request, response, next) {
    try {
      const drinkDB = await servicesDB.getRandomDrinkFromDB();

      response.send({
        status: 'ok',
        size: drinkDB.length,
        drinks: drinkDB,
      });

      logger.info(`GET /drinks/random - ${JSON.stringify(drinkDB)}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DrinkController();
