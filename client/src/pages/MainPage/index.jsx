import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import DrinkItem from '../../components/DrinkItem';
import Spinner from '../../components/Spinner';

import './styles.css';

function MainPage({
  defaultIngredients = [],
  handleLimitSearch,
  handleSelectIngredients,
  ingredients = [],
  matchedDrinks = [],
  notFoundDrinks = false,
  searchDrinksOnDB,
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

  return (
    <>
      <h1>What's in your bar?</h1>
        <Select
          className="basic-multi-select select-custom"
          classNamePrefix="select"
          isMulti
          name="ingredients"
          options={ingredients}
          onChange={(selectedIngredients) => handleSelectIngredients(selectedIngredients)}
          styles={customSelectStyles}
          defaultValue={defaultIngredients}
        />

        <Checkbox
          id="notLimitedIngredients"
          label="I don't want to limit the search to all chosen ingredients"
          handleSelectCheckbox={() => handleLimitSearch(true)}
        />

        <div className="buttons-row">
          <Button
            handleClickButton={() => searchDrinksOnDB({ random: false })}
            label="search drinks"
          />
          <Button
            handleClickButton={() => searchDrinksOnDB({ random: true })}
            label="random drink"
          />
        </div>

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
  handleLimitSearch: PropTypes.func,
  handleSelectIngredients: PropTypes.func.isRequired,
  ingredientsDB: PropTypes.array,
  matchedDrinks: PropTypes.array,
  notFoundDrinks: PropTypes.bool,
  searchDrinksOnDB: PropTypes.func.isRequired,
  showLoading: PropTypes.bool
};

export default MainPage;
