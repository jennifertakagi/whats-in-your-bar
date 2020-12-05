import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

function Checkbox({
  id,
  handleSelectCheckbox,
  label,
}) {
  return (
    <div className="checkbox">
      <input
        id={id}
        name={id}
        onChange={handleSelectCheckbox}
        type="checkbox"
        value={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  handleSelectCheckbox: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Checkbox;
