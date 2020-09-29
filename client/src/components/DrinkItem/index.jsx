import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function DrinkItem({
  category = '',
  drink_type = '',
  glass_type = '',
  image = '',
  instructions,
  measurements_ingredients,
  name
}) {
  const hasImage = image;
  const measurements = measurements_ingredients.join(', ');

  return (
    <li className="drink-card">
      <div className="image-box">
        {!hasImage ?
            <img
            src={require('../../assets/icons/no_image.svg')}
            alt={name}
          />
          : <img
              src={image}
              alt={name}
            />
        }
      </div>
      <div className="information-box">
        <p>{name}</p>
        <hr className="name-separator" />
        <p>{category}</p>
        <p>{drink_type}</p>
        <p>{glass_type}</p>
        <p className="instructions">
          <span>How to: </span>
          {instructions}
        </p>
        <p className="measurements">
          <span>↪ </span>
          {measurements}
        </p>
      </div>
    </li>
  );
}

DrinkItem.propTypes = {
  category: PropTypes.string,
  drink_type: PropTypes.string,
  glass_type: PropTypes.string,
  image: PropTypes.string,
  instructions: PropTypes.string.isRequired,
  measurements_ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default DrinkItem;
