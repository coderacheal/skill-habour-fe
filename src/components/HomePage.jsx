import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/skill-habour-logo.png';

const HomePage = () => (
  <div className="homePage">
    <div className="dashboard">
      <img src={logo} alt="Skill Share Logo" className="skill-share-logo" />
      <div>
        <h2>Dashboard</h2>
        <ul className="navigation">
          <Link to="/home">Courses</Link>
          <Link to="/reserve">Reserve Course</Link>
          <Link to="/reservation/my_reservation">My Reservations</Link>
          <Link to="/reservation/delete_reservation">Remove Reservation</Link>
        </ul>
      </div>
    </div>
    <div className="availableClasses" />
  </div>
);

export default HomePage;
