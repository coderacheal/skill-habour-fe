import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails, fetchCourses } from '../features/courseSlice';

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
    <div>
      <div className="oneCourse" key={selectedCourse.name}>
        <div className="courseDetails">
          <img src={selectedCourse.image} alt="course" className="image" />
          <p>
            Name :
            {' '}
            {selectedCourse.name}
          </p>
          {isLoggedIn ? (
            // User is logged in, display "Reserve" link
            <Link to="/reservation">Reserve</Link>
          ) : (
            // User is not logged in, display "Register" link
            <Link to="/auth">Register</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
