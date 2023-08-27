import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  handleUpdate, logInUser, registerUser, toggleFormAuth,
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

  const formAuth = useSelector((state) => state.auth.formAuth);

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
    if (formAuth === 'login') {
      handleLogIn(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <main >
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 >
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </h1>
        {formAuth === 'register' && (
          <div >
            <input
              type="text"
              placeholder="username"
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
            placeholder="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div >
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {formAuth === 'register' && (
          <div className="field">
            <input
              type="password"
              placeholder="confirm password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </button>
        {formAuth === 'login' ? (
          <>
            <p>Don&apos;t have an account?</p>
            <button
              type="button"
              onClick={() => dispatch(toggleFormAuth())}
              className="switch-auth"
            >
              Register
            </button>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => dispatch(toggleFormAuth())}
              className="switch-auth"
            >
              Log In
            </button>
          </>
        )}
      </form>
      <button type="submit" className="submit-btn">
          {formAuth === 'login' ? 'Log In' : 'Register'}
        </button>
    </main>
  );
};

export default Authentication;
