import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from '../../components/Button';
import DrinkItem from '../../components/DrinkItem';
import Spinner from '../../components/Spinner';

import './styles.css';

function MainPage({
  defaultIngredients = [],
  getDrinksByIngredientsFromDB,
  handleSelectIngredients,
  ingredients = [],
  matchedDrinks = [],
  notFoundDrinks = false,
  showLoading = false
}) {
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
       borderColor: '#474787',
      boxShadow: 'none'
    }),
    option: (provided) => ({
      ...provided,
      color: '#474787',
      padding: 10,
    })
  }

  const drinksItems = matchedDrinks.map((drink) =>
    <DrinkItem
      category={drink.category}
      drink_type={drink.drink_type}
      glass_type={drink.glass_type}
      image={drink.image}
      instructions={drink.instructions}
      key={drink._id}
      measurements_ingredients={drink.measurements_ingredients}
      name={drink.name}
    />
  );

  function handleSearchDrink() {
    getDrinksByIngredientsFromDB(true);
  }

  return (
    <>
      <h1>What's in your bar?</h1>
        <Select
          className="basic-multi-select select-custom"
          classNamePrefix="select"
          isMulti
          name="ingredients"
          options={ ingredients }
          onChange={(selectedIngredients) => handleSelectIngredients(selectedIngredients)}
          styles={customSelectStyles}
          defaultValue={defaultIngredients}
        />
        <Button
          handleClickButton={handleSearchDrink}
          label="search drinks"
        />
        {showLoading
          ? <Spinner />
          : notFoundDrinks
          ? <p className="not-found-text">No drinks available :(</p>
          : <ul> {drinksItems} </ul>
        }
    </>
  );
}

MainPage.propTypes = {
  defaultIngredients: PropTypes.array,
  getDrinksByIngredientsFromDB: PropTypes.func.isRequired,
  handleSelectIngredients: PropTypes.func.isRequired,
  ingredientsDB: PropTypes.array,
  matchedDrinks: PropTypes.array,
  notFoundDrinks: PropTypes.bool,
  showLoading: PropTypes.bool
};

export default MainPage;
