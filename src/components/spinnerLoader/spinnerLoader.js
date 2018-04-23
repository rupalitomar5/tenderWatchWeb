import React from 'react';
import spinner from './spinner.svg';
import './../../index.css';

const SpinnerLoader = () => {
  return(
      <div>
          <img className='spinner' alt={'loading...'} src={spinner} />
      </div>
  )
};

export default SpinnerLoader;