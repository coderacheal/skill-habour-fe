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
  console.log(selectedCourse);

  return (
    <div>
      {selectedCourse.map((course) => (
        <div className="oneCurrency" key={course.id}>
          <div className="courseDetails">
            <img key={course.id} src={course.image} alt="coin" className="image" />
            <p key={course.id}>
              Name :
              {' '}
              {course.name}
            </p>
            <Link to="/auth">Reserve</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
