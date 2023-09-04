import React from 'react';
import Dashboard from './Dashboard';
import ReservationList from './ReservationList';
import SignOutButton from './SignOutButton';

const MyReservations = () => (
  <div className="wrapper">
    <Dashboard />
    <div>
      <SignOutButton />
      <ReservationList />
    </div>
  </div>
);

export default MyReservations;
