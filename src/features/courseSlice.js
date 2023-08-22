import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../Data/data';

// Define an async thunk for fetching courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () =>
  // const response = await fetch('url');
  // const data = await response.json();
  data);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => ({
      ...state,
      courses: action.payload,
    }));
  },
});

export default courseSlice.reducer;
