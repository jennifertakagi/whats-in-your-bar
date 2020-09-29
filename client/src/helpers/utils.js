/**
 * Mounts the select object, with value and label,
 * according to each ingredient
 * @param {Array} ingredients Ingredients' name
 * @returns {Object[]} Object with value and label to select tag
 */
export function mountSelectObject(ingredients = []) {
  return ingredients.reduce((listIngredients, ingredient) => {
    listIngredients.push({value: ingredient, label: ingredient});

    return listIngredients;
  }, [])
}

/**
 * Mounts the ingredients' query to search in database,
 * this is a string splitted with comma, e.g: gin,vodka,lemon
 * @param {Array} ingredients Ingredients' name
 * @returns {String} ingredients query
 */
export function mountIngredientsQuery (ingredients = []) {
  return ingredients.reduce((queryIngredients, ingredient, index) => {
    return index === ingredients.length - 1 ?
      queryIngredients.concat(`${ingredient.value}`) :
      queryIngredients.concat(`${ingredient.value},`);
  },'')
}
