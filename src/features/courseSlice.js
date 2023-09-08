import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://skill-habour.onrender.com/api/v1/courses';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await fetch(baseUrl);
  const data = await response.json();
  return data;
});

export const addNewCourse = createAsyncThunk(
  'course/addNewCourse',
  async (courseDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}`,
        courseDetails,
        {
          headers: {
            authorization: thunkAPI.getState().auth.token,
          },
        },
      );
      thunkAPI.dispatch(fetchCourses);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  },
);

export const deleteCourse = (id) => async () => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    if (response.ok) {
      window.location.reload();
    }
    return null;
  } catch (error) {
    console.error(error);
    return error;
  }
};

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
