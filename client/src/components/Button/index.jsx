import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Button({
  handleClickButton,
  label,
  type = 'button'
}) {
  return (
    <button
      type={ type }
      onClick={ handleClickButton }
    >
      { label }
    </button>
  );
}

Button.propTypes = {
  handleClickButton: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Button;
