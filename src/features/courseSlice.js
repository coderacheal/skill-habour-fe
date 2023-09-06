import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'http://127.0.0.1:3001/api/v1/courses';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
});

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
