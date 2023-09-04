import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails, fetchCourses } from '../features/courseSlice';
import Dashboard from './Dashboard';
import SignOutButton from './SignOutButton';

const CourseDetails = () => {
  const { courses } = useSelector((store) => store.courses);
  const { courseName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(getCourseDetails(courseName));
  }, [dispatch, courseName, courses]);

  const selectedCourse = courses.find((course) => course.name === courseName);

  // Check if the user is logged in by examining the data in local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = user !== null;

  return (
    <div className="wrapper">
      <Dashboard />
      <div className="oneCourse" key={selectedCourse.name}>
        <SignOutButton />
        <div className="courseDetails">
          <img src={selectedCourse.image} alt="course" className="course-image" />
          <div className="full-course-description">
            <h3>{selectedCourse.name}</h3>
            <p>{selectedCourse.description}</p>
            <p>
              Price $
              {selectedCourse.price}
              .00
            </p>
            {isLoggedIn ? (
              <Link to="/reservations">
                <button type="button" className="enroll-btn">Enroll in course</button>
              </Link>
            ) : (
              <Link to="/auth">
                <button type="button" className="enroll-btn">Sign in to enroll</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
