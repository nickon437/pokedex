import React from 'react';
import '../styles/Loader.scss';

const Loader = () => {
  return (
    <div className='loader'>
      <div className='loader-piece' />
      <div className='loader-piece' />
      <div className='loader-piece' />
      <div className='progress-bar'>
        <div className='loaded-section' />
      </div>
    </div>
  );
};

export default Loader;
