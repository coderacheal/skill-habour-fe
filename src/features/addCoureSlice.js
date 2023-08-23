import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = ''; // we will find the api url from back end

export const AddnewCourse = createAsyncThunk(
  'api/AddnewCourse',
  async (payload) => {
    const response = await fetch(`${baseUrl}/course`, {
      method: 'POST',
      body: payload,
    });
    const data = await response.json();
    return data;
  },
);

export const getCourses = createAsyncThunk('course/getCourse', async () => {
  const response = await axios.get(`${baseUrl}/courses`);
  return response.data;
});

export const Course = createAsyncThunk('course/Course', async (payload) => {
  const response = await axios.get(`${baseUrl}/courses/${payload}`);
  return response.data;
});

export const Deletecourse = createAsyncThunk('course/Deletecourse', async (payload) => {
  const response = await axios.delete(`${baseUrl}/courses/${payload}`);
  return response.data;
});

export const userCourse = createAsyncThunk('course/userCourse', async (payload) => {
  const response = await axios.get(`${baseUrl}/courses/courses?id=${payload}`);
  return response.data;
});

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
      state.cars.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Course.fulfilled, (state, action) => {
      state.course = action.payload;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });

    builder.addCase(userCourse.fulfilled, (state, action) => {
      state.userCourses = action.payload;
    });
  },

});

export const { addCourse } = CourseSlice.actions;

export default CourseSlice.reducer;
