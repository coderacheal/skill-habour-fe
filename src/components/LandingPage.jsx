import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="landingPage">
    <div className="brandNameWrapper">
      <h1 className="brandName">Skill Habour</h1>
      <Link to="/home" className="homeBtn">
        Learn for free
        {' '}
        <i aria-label="Input Label" className="fa-solid fa-house" />
      </Link>
    </div>
  </div>
);

export default LandingPage;
