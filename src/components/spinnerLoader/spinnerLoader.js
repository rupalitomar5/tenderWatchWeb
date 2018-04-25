import React from 'react';
import './../../index.css';

const SpinnerLoader = () => {
  return(
      <div className='spinner-container'>
          <img className='spinner' alt={'loading...'} src='images/spinnerLoader.gif' />
      </div>
  )
};

export default SpinnerLoader;