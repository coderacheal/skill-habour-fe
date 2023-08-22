import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div className="landingPage">
    <div className="brandNameWrapper">
      <h1 className="brandName">Skill Habour</h1>
      <Link to="/home" className="homeBtn">
        <p>Learn for free</p>
      </Link>

    </div>
  </div>
);

export default LandingPage;
