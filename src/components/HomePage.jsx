import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector, useDispatch } from 'react-redux';
import { CustomNextArrow, CustomPrevArrow } from './CarouselArrows';
import { fetchCourses } from '../features/courseSlice';
import Dashboard from './Dashboard';

const HomePage = () => {
  const { courses } = useSelector((store) => store.courses);
  // const { username } = useSelector((store) => store.auth.sessionUser.username);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // console.log(courses);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="wrapper">
      <Dashboard />
      <div className="availableClasses">
        <h1 className="ribbon">AVAILABLE COURSES</h1>
        <p className="fade">Select a course you would like to take</p>
        <p className="fade">{'.'.repeat(50)}</p>
        <div className="sliderDiv">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Slider {...settings} className="slider">
            {courses.map((course) => (
              <div key={course.id}>
                <Link to={`/courses/${course.name}`} className="imageNameLink">
                  <div className="eachClass">
                    <img src={course.image} alt="pottery class" className="classThumbnail" />
                    <h2 className="courseName">{course.name}</h2>
                  </div>
                </Link>
                <p className="dots">{'.'.repeat(20)}</p>
                <p className="classDescription">{course.description}</p>
                <div className="socialLinksForCourses">
                  <a href="https://github.com/coderacheal" target="blank"><i aria-label="Input Label" className="fa-brands fa-facebook course_socials" /></a>
                  <a href="https://twitter.com/racheal_kubi" target="blank"><i aria-label="Input Label" className="fa-brands fa-twitter course_socials" /></a>
                  <a href="https://medium.com/@coderacheal" target="blank"><i aria-label="Input Label" className="fa-regular fa-envelope course_socials" /></a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
