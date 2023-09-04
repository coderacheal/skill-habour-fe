import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails, fetchCourses } from '../features/courseSlice';
import '../styles/CourseDetails.css';

const CourseDetails = () => {
  const { courses } = useSelector((store) => store.courses);
  const { courseName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getCourseDetails(courseName));
  }, [dispatch, courseName]);

  const selectedCourse = courses.find((course) => course.name === courseName);

  // Check if the user is logged in by examining the data in local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = user !== null;

  return (
    <div className="course-details-container">
      <div className="oneCourse" key={selectedCourse.name}>
        <div className="courseDetails">
          <img src={selectedCourse.image} alt="course" className="image" />
          <p className="course">
            Course name:
            {' '}
            <br />
            {selectedCourse.name}
          </p>
          {isLoggedIn ? (
            <>
              <p>Click Reserve button to make a reservation</p>
              <Link to="/reservation">
                <button type="button" className="btn btn-primary">Reserve</button>
              </Link>
            </>
          ) : (
            <>
              <p>Please Register before making any reservation</p>
              <Link to="/auth">
                <button type="button" className="btn btn-primary">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
