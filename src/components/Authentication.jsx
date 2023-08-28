import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  handleUpdate, logInUser, registerUser, toggleAuthentication,
} from '../features/authenticationSlice';

const Authentication = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/courses');
    }
  }, [isLoggedIn, navigate]);

  const {
    sessionUser: {
      username, email, password, confirmPassword,
    },
  } = useSelector((state) => state.auth);

  const authenticate = useSelector((state) => state.auth.authenticate);

  const handleRegister = () => {
    dispatch(
      registerUser({
        user: {
          username,
          email,
          password,
        },
      }),
    );
    navigate('/courses');
  };

  const handleLogIn = () => {
    dispatch(
      logInUser({
        user: {
          email,
          password,
        },
      }),
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleUpdate({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authenticate === 'login') {
      handleLogIn(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <main className="login-background">
      <div className="formDiv">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="form-ribbon">
            {authenticate === 'login' ? 'Log In' : 'Register'}
          </h1>
          {authenticate === 'register' && (
            <div>
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          {authenticate === 'register' && (
            <div className="field">
              <input
                type="password"
                placeholder="Cnfirm password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
          )}
          <button type="submit" className="submit-btn">
            {authenticate === 'login' ? 'Log In' : 'Register'}
          </button>
          {authenticate === 'login' ? (
            <div className="toggleAuthentication">
              <p>Don&apos;t have an account?</p>
              <button
                type="button"
                onClick={() => dispatch(toggleAuthentication())}
                className="switch-authentication"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="toggleAuthentication">
              <p>Already have an account?</p>
              <button
                type="button"
                onClick={() => dispatch(toggleAuthentication())}
                className="switch-authentication"
              >
                Log In
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Authentication;