const mongoose = require('mongoose');

const drinkSchema = mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  drink_type: {
    type: String,
    require: true,
  },
  glass_type: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  ingredients: {
    type: Array,
    require: true,
  },
  instructions: {
    type: String,
    require: true,
  },
  measurements_ingredients: {
    type: Array,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
});

const drinkModel = mongoose.model('drinks', drinkSchema);

module.exports = drinkModel;
