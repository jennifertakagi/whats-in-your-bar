const express = require('express');

const drinkRouter = express.Router();
const DrinkController = require('../controller/DrinkController');

drinkRouter.get('/allIngredients', DrinkController.getAllIngredients);
drinkRouter.get('/', DrinkController.getDrinksByIngredients);

drinkRouter.use((error, req, res) => {
  logger.error(`${req.method} ${req.baseUrl} ${error.message}`);
  res.status(400).send({ error: error.message });
});

module.exports = drinkRouter;
