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
  }, [dispatch, courses, courseName]);

  const selectedCourse = courses.filter((course) => course.name === courseName);

  return (
    <div>
      {selectedCourse.map((course) => (
        <div className="oneCourse" key={course.name}>
          <div className="courseDetails">
            <img key={course.name} src={course.image} alt="course" className="image" />
            <p key={course.name}>
              Name :
              {' '}
              {course.name}
            </p>
            {/* {condition to navigate to authentication or login} */}
            <Link to="/auth">Reserve</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
