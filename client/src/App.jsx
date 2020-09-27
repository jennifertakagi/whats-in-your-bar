import React, { useEffect, useState } from 'react';

import api from './services/api';

import './assets/styles/global.css';
import './styles.css';

export default function App() {
  const [ingredientsDB, setIngredientsDB] = useState([]);

  /**
   * Gets all drinks' ingredients from database and
   * set it on state to show on select to user
   */
  function getIngredientsFromDB() {
    api.get('/drinks/allIngredients')
      .then((response) => {
        const { data = {} } = response;
        setIngredientsDB(data.ingredients);
      });
  }

  useEffect(() => {
    getIngredientsFromDB();
  }, []);

  return (
    <div className="container" id="main-page">
      <h1>What's in your bar?</h1>
    </div>
  );
}
