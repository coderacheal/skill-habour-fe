import React from 'react';
import Dashboard from './Dashboard';

const HomePage = () => (
  <div className="wrapper">
    <Dashboard />
    <div className="availableClasses">
      <h1>Available Courses</h1>
      <p>Please select a course you would like to take</p>
    </div>
  </div>
);

export default HomePage;
