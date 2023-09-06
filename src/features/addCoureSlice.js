import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3001/api/v1/courses'; // Replace this with the appropriate API URL

export const addNewCourse = createAsyncThunk(
  'course/addNewCourse',
  async (payload) => {
    const response = await axios.post(`${baseUrl}/course`, payload);
    return response.data;
  },
);

export const getCourses = createAsyncThunk('course/getCourses', async () => {
  const response = await axios.get(`${baseUrl}/courses`);
  return response.data;
});

export const getCourse = createAsyncThunk('course/getCourse', async (payload) => {
  const response = await axios.get(`${baseUrl}/courses/${payload}`);
  return response.data;
});

export const deleteCourse = createAsyncThunk('course/deleteCourse', async (payload) => {
  const response = await axios.delete(`${baseUrl}/courses/${payload}`);
  return response.data;
});

export const getUserCourses = createAsyncThunk('course/getUserCourses', async (payload) => {
  const response = await axios.get(`${baseUrl}/courses`, { params: { id: payload } });
  return response.data;
});

const initialState = {
  courses: [],
  course: '',
  userCourses: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse: (state, action) => ({
      ...state,
      courses: [...state.courses, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getCourse.fulfilled, (state, action) => ({
      ...state,
      course: action.payload,
    }));
    builder.addCase(getCourses.fulfilled, (state, action) => ({
      ...state,
      courses: action.payload,
    }));
    builder.addCase(getUserCourses.fulfilled, (state, action) => ({
      ...state,
      userCourses: action.payload,
    }));
  },
});

export const { addCourse } = courseSlice.actions;

export default courseSlice.reducer;
