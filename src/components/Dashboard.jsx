import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/skill-habour-logo.png';
import Socials from './Socials';

const Dashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const { pathname } = useLocation();

  const navRef = useRef();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="dashboard">
      <img src={logo} alt="Skill Share Logo" className="skill-share-logo" />
      <div className="dashboardNavigations" ref={navRef}>
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
        <ul className="navigation">
          <Link to="/courses" className={` links ${(pathname === '/courses') ? 'active' : ''}`}>Courses</Link>
          {user && user.role === 'Admin' && <Link to="/new_course" className={` links ${(pathname === '/new_course') ? 'active' : ''}`}>Add Course</Link>}
          {user && user.role === 'Admin' && <Link to="/delete_course" className={` links ${(pathname === '/delete_course') ? 'active' : ''}`}>Delete Course</Link>}
          <Link to="/reservations" className={`links ${(pathname === '/reservations') ? 'active' : ''}`}>Reserve Course</Link>
          <Link to="/my_reservations" className={`links ${(pathname === '/my_reservations') ? 'active' : ''}`}>My Reservations</Link>
        </ul>
        <Socials />
      </div>
      <div>
        {isNavbarOpen ? (
          <button className="nav-btn nav-close-btn" type="button" onClick={showNavbar}>
            <FaTimes />
          </button>
        ) : (
          <button className="nav-btn nav-open-btn" type="button" onClick={showNavbar}>
            <FaBars />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
