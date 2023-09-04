import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/skill-habour-logo.png';
import Socials from './Socials';

const Dashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const loggedInUser = localStorage.getItem('user');
  const { pathname } = useLocation();

  return (
    <div className="dashboard">
      <img src={logo} alt="Skill Share Logo" className="skill-share-logo" />
      <div className="dashboardNavigations">
        <h2>Dashboard</h2>
        {
          user ? (
            <h5>
              Hi,
              {' '}
              {user.username}
            </h5>
          ) : <p>You are not logged in</p>
        }
        <p />
        <ul className="navigation">
          <Link to="/courses" className={` links ${(pathname === '/courses') ? 'active' : ''}`}>Courses</Link>
          {loggedInUser && <Link to="/reservations" className={`links ${(pathname === '/reservations') ? 'active' : ''}`}>Reserve Course</Link>}
          {loggedInUser && <Link to="/my_reservations" className={`links ${(pathname === '/my_reservations') ? 'active' : ''}`}>My Reservervations</Link>}
          <Link to="/add_course" className={` links ${(pathname === '/add_course') ? 'active' : ''}`}>Add Course</Link>
          <Link to="/delete_reservation" className={`links ${(pathname === '/delete_reservation') ? 'active' : ''}`}>Delete Reservation</Link>
        </ul>
      </div>
      <Socials />
    </div>
  );
};

export default Dashboard;
