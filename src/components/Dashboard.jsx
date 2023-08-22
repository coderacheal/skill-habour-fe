import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/skill-habour-logo.png';
import Socials from './Socials';

const Dashboard = () => (
  <div className="dashboard">
    <img src={logo} alt="Skill Share Logo" className="skill-share-logo" />
    <div className="dashboardNavigations">
      <h2>Dashboard</h2>
      <ul className="navigation">
        <Link to="/home" className="links">Courses</Link>
        <Link to="/reservations" className="links">Reserve Course</Link>
        <Link to="/reservations/my_reservation" className="links">My Reservations</Link>
        <Link to="/reservations/delete_reservation" className="links">Delete Reservation</Link>
      </ul>
    </div>
    <Socials />
  </div>
);

export default Dashboard;
