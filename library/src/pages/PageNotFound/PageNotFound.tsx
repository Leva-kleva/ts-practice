import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './PageNotFound.scss';

const PageNotFound = () => {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound-wrapper">
        <h1>404</h1>
        <h4>the page you're looking for was not found</h4>
        <Link to="/" className="reset-link">
          <Button type="button" variant="text" color="primary">
            Go to the homepage
          </Button>
        </Link>
      </div>
      <div className="waveWrapper waveAnimation">
        <div className="waveWrapperInner bgTop">
          <div className="wave waveTop"></div>
        </div>
        <div className="waveWrapperInner bgMiddle">
          <div className="wave waveMiddle"></div>
        </div>
        <div className="waveWrapperInner bgBottom">
          <div className="wave waveBottom"></div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
