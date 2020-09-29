import React, { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';

import api from './services/api';
import { mountIngredientsQuery, mountSelectObject } from './helpers/utils';
import {defaultSelectedValues} from './helpers/defaultSelectedValues';

import './assets/styles/global.css';

export default function App() {
  const [defaultIngredients, setDefaultIngredients] = useState(defaultSelectedValues);
  const [drinks, setDrinks] = useState([]);
  const [ingredientsDB, setIngredientsDB] = useState([]);
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
  }, []);

  /**
   * Gets the matched drinks from database, and sets them on state
   */
  function getDrinksByIngredientsFromDB(buttonClicked) {
    const queryIngredients = mountIngredientsQuery(selectedIngredients);
    
    setShowLoading(buttonClicked);
    
    api.get(`/drinks/?ingredients=${queryIngredients}`)
      .then((response) => {
        const { data = {} } = response;
        const drinksDB = data.drinks || [];

        setTimeout(() => {
          setShowLoading(false);
          setDrinks(drinksDB);

          if (!drinksDB.length) {
            setNotFoundDrinks(true);
          }
        }, 1000);
      });
  }

  /**
   * Handles with selected ingredients, setting these on state
   * @param {Array} selectedIngredients list of selected ingredients
   */
  function handleSelectIngredients(selectedIngredients) {
    console.log(selectedIngredients)
    setSelectedIngredients(selectedIngredients);
  }

  return (
    <div className="container" id="main-page">
      <MainPage
        defaultIngredients={defaultIngredients}
        getDrinksByIngredientsFromDB={getDrinksByIngredientsFromDB}
        handleSelectIngredients={handleSelectIngredients}
        ingredients={ingredientsDB}
        matchedDrinks={drinks}
        showLoading={showLoading}
        notFoundDrinks={notFoundDrinks}
      />
    </div>
  );
}
