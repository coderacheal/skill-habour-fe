import React, { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCourses, deleteCourse } from '../features/courseSlice';
import Dashboard from './Dashboard';
import SignOutButton from './SignOutButton';

const DeleteCourse = () => {
  const { courses } = useSelector((store) => store.courses);
  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (e) => {
    const { id } = e.target.dataset;
    dispatch(deleteCourse(id));
  };

  return (
    <div className="wrapper">
      <Dashboard />
      <div className="deleteCoursesContainer">
        <SignOutButton />
        <div className="ribbon-and-authentication">
          <h1 className="ribbon">ALL COURSES</h1>
        </div>
        { user ? (
          <div className="all_courses">
            {courses.map((course) => (
              <div key={course.id}>
                <Link to={`/courses/${course.name}`} className="">
                  <div className="eachClass">
                    <img src={course.image} alt="pottery class" className="classThumbnail" />
                    <h2 className="courseName">{course.name}</h2>
                  </div>
                </Link>
                <button type="button" onClick={handleDelete} data-id={course.id}>Delete Course </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Admin not logged in</p>
        )}
      </div>
    </div>
  );
};

export default DeleteCourse;
