const express = require('express');
const drinkRouter = express.Router();
const DrinkController = require('../controller/DrinkController');

drinkRouter.get('/', DrinkController.getDrink);

drinkRouter.use((error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} ${error.message}`);
  res.status(400).send({ error: error.message});
});

module.exports = drinkRouter;