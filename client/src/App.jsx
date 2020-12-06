import React, { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';

import api from './services/api';
import { mountIngredientsQuery, mountSelectObject } from './helpers/utils';
import {defaultSelectedValues} from './helpers/defaultSelectedValues';

import './assets/styles/global.css';

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const [ingredientsDB, setIngredientsDB] = useState([]);
  const [limitSearch, setLimitSearch] = useState(true);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [notFoundDrinks, setNotFoundDrinks] = useState(false);

  /**
   * Gets all drinks' ingredients from database and
   * set it on state to show on select to user
   */
  function getIngredientsFromDB() {
    api.get('/drinks/allIngredients')
      .then((response) => {
        const { data = {} } = response;
        const ingredientsOptions = mountSelectObject(data.ingredients);

        setIngredientsDB(ingredientsOptions);
      });
  }

  useEffect(() => {
    getIngredientsFromDB();
    setSelectedIngredients(defaultSelectedValues);
  }, []);

  /**
   * Gets drinks from database, and sets them on state
   * @param {boolean} random - flag to search a random drink
   */
  function searchDrinksOnDB({ random }) {
    setNotFoundDrinks(false);

    const queryIngredients = mountIngredientsQuery(selectedIngredients || []);
    const route = random ? '/drinks/random' : `/drinks/?ingredients=${queryIngredients}&limitSearch=${limitSearch}`;

    setShowLoading(true);

    api.get(route)
      .then((response) => {
        const { data: { drinks: drinksDB = [] }= {} } = response;

        setTimeout(() => {
          setShowLoading(false);
          setDrinks(drinksDB);

          if (!drinksDB.length) setNotFoundDrinks(true);
        }, 1000);
      });
  }

  /**
   * Handles with selected ingredients, setting these on state
   * @param {Array} selectedIngredients list of selected ingredients
   */
  function handleSelectIngredients(selectedIngredients) {
    setSelectedIngredients(selectedIngredients);
  }

  function handleLimitSearch() {
    setLimitSearch(!limitSearch)

    if (limitSearch) {
      const ingredients = selectedIngredients.filter(ingredient => !defaultSelectedValues.includes(ingredient))
      setSelectedIngredients(ingredients)
    } else {
      setSelectedIngredients(selectedIngredients, ...defaultSelectedValues)
    }
  }

  return (
    <div className="container" id="main-page">
      <MainPage
        defaultIngredients={defaultSelectedValues}
        handleSelectIngredients={handleSelectIngredients}
        ingredients={ingredientsDB}
        handleLimitSearch={handleLimitSearch}
        matchedDrinks={drinks}
        showLoading={showLoading}
        searchDrinksOnDB={searchDrinksOnDB}
        notFoundDrinks={notFoundDrinks}
      />
    </div>
  );
}
