import React from 'react';
import './../../index.css';
import spinner from './spinnerLoader.gif';

const SpinnerLoader = () => {
  return(
      <div className='spinner-container'>
          <img className='spinner' alt={'loading...'} src={spinner} />
      </div>
  )
};

export default SpinnerLoader;