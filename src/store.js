import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './features/courseSlice';
import authenticationReducer from './features/authenticationSlice';

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    courses: courseReducer,
  },
});

export default store;
