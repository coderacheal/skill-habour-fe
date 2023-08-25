import React from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import TestRideForm from './TestRideForm';
import '../styles/TestRideForm.css';

const Reservations = () => {
  const location = useLocation();
  const autofillUsername = location.state?.autofillUsername || '';

  return (
    <div className="wrapper">
      <Dashboard />
      <div className="content">
        <h2 className="title">Reserve your course</h2>
        <TestRideForm autofillUsername={autofillUsername} />
      </div>
    </div>
  );
};

export default Reservations;
