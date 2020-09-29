import React from 'react';

import loadingIcon from '../../assets/icons/loading.gif';

import './styles.css';

export default function Spinner() {
  return (
    <div id="spinner">
      <img
        src={loadingIcon}
        alt="Loading..."
      />
    </div>
  );
}
