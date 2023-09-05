import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3001/api/v1';

export const addNewCourse = createAsyncThunk(
  'api/AddnewCourse',
  async (payload) => {
    const response = await fetch(`${baseUrl}/courses`, {
      method: 'POST',
      body: payload,
    });
    const data = await response.json();
    return data;
  },
);

const initialState = {
  courses: [],
  course: '',
  userCourses: [],
};

const CourseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });
  },
});

export const { addCourse } = CourseSlice.actions;

export default CourseSlice.reducer;
