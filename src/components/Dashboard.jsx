import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/skill-habour-logo.png';
import Socials from './Socials';

const Dashboard = () => {
  const { pathname } = useLocation();

  return (
    <div className="dashboard">
      <img src={logo} alt="Skill Share Logo" className="skill-share-logo" />
      <div className="dashboardNavigations">
        <h2>Dashboard</h2>
        <ul className="navigation">
          <Link to="/courses" className={` links ${(pathname === '/courses') ? 'active' : ''}`}>Courses</Link>
          <Link to="/reservations" className={`links ${(pathname === '/reservations') ? 'active' : ''}`}>Reserve Course</Link>
          <Link to="/my_reservations" className={` links ${(pathname === '/my_reservations') ? 'active' : ''}`}>My Reservations</Link>
          <Link to="/delete_reservation" className={`links ${(pathname === '/delete_reservation') ? 'active' : ''}`}>Delete Reservation</Link>
        </ul>
      </div>
      <Socials />
    </div>
  );
};

export default Dashboard;
