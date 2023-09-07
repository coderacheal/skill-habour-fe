import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import '../styles/ReservationForm.css';
import ReservationForm from './ReservationForm';
import SignOutButton from './SignOutButton';
import AuthenticationForm from './AuthenticationForm';

const Reservations = () => {
  const location = useLocation();
  const user = useSelector((store) => store.auth.user);
  const autofillUsername = location.state?.autofillUsername || '';

  return (
    <div className="wrapper">
      <Dashboard />
      {user ? (
        <div className="content">
          <SignOutButton />
          <ReservationForm autofillUsername={autofillUsername} />
        </div>
      ) : (
        <AuthenticationForm />
      )}
    </div>
  );
};

export default Reservations;
