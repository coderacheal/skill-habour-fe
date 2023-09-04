import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../features/authenticationSlice';
import { fetchCourses } from '../features/courseSlice';

const SignOutButton = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handlelogout = () => {
    dispatch(logOutUser());
    navigate('/courses');
  };

  const handlelogIn = () => {
    navigate('/auth');
  };

  return (
    <div className="signout-div">
      {user ? (
        <button type="button" className="sign-out-btn" onClick={handlelogout}>Sign out</button>) : (
        <button type="button" className="sign-out-btn" onClick={handlelogIn}>Sign in</button>
      )}
    </div>
  );
};

export default SignOutButton;
