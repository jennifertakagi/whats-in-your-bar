//const servicesDB = require('../services/transactionService');

class DrinkController {
  async getDrink(request, response, next) {
    try {

      logger.info(`GET /drink - ${JSON.stringify({})}`);
    } catch (error) {
        next(error);
    }
  }

}

module.exports = new DrinkController;