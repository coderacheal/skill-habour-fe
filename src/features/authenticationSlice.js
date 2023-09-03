import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../Utils/localStorage';

const baseUrl = 'http://127.0.0.1:3001';

const initialState = {
  token: getLocalStorage('token') || null,
  user: getLocalStorage('user') || null,
  sessionUser: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  isLoading: false,
  errors: null,
  authenticate: 'login',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/users`, userInput);
      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        return thunkAPI.rejectWithValue('username and email must be unique');
      }
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  },
);

export const logInUser = createAsyncThunk(
  'auth/login',
  async (userInput, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/users/sign_in`, userInput);
      // eslint-disable-next-line dot-notation
      const sessionToken = response.headers.authorization;
      response.data.sessionToken = sessionToken;
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  },
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseUrl}/users/sign_out`, {
        headers: {
          authorization: thunkAPI.getState().auth.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  },
);

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleUpdate: (state, { payload: { name, value } }) => {
      const sessionUser = { ...state.sessionUser, [name]: value };
      return { ...state, sessionUser };
    },
    toggleAuthentication: (state) => ({
      ...state,
      authenticate: state.authenticate === 'login' ? 'register' : 'login',
    }),
    toRegister: (state) => ({
      ...state,
      authenticate: 'register',
    }),
    toLogin: (state) => ({
      ...state,
      authenticate: 'login',
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setLocalStorage('token', payload.sessionToken);
        setLocalStorage('user', payload.status.data);
        return {
          ...state,
          isLoading: false,
          sessionUser: {
            username: '',
            confirmPassword: '',
          },
        };
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        setLocalStorage('token', payload.sessionToken);
        setLocalStorage('user', payload.status.data);
        return {
          ...state,
          token: payload.sessionToken,
          user: payload.status.data,
          isLoading: false,
          sessionUser: {
            email: '',
            password: '',
          },
        };
      })
      .addCase(logOutUser.fulfilled, (state) => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        return {
          ...state,
          isLoading: false,
          token: null,
          user: null,
        };
      });
  },
});

export const {
  handleUpdate, toggleAuthentication, toRegister, toLogin,
} = authSlice.actions;

export default authSlice.reducer;
