import React from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import '../styles/ReservationForm.css';
import ReservationForm from './ReservationForm';

const Reservations = () => {
  const location = useLocation();
  const autofillUsername = location.state?.autofillUsername || '';

  return (
    <div className="wrapper">
      <Dashboard />
      <div className="content">
        <ReservationForm autofillUsername={autofillUsername} />
      </div>
    </div>
  );
};

export default Reservations;
