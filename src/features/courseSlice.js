import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../Data/data';

// Define an async thunk for fetching courses
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => data);
// const response = await fetch('url');
// const data = await response.json();
// data);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    getCourseDetails: (state, action) => {
      const courseName = action.payload;
      state.courses.map((course) => {
        if (course.name === courseName) {
          return course;
        } return 'No such Course!';
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => ({
      ...state,
      courses: action.payload,
    }));
  },
});

export const { getCourseDetails } = courseSlice.actions;
export default courseSlice.reducer;
