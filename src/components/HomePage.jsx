import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Dashboard from './Dashboard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomPrevArrow } from './CarouselArrows';
import pottery from '../assets/pottery.jpg';

const HomePage = () => {
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
          <Slider {...settings} className="slider">
            <div>
              <Link to="/" className="imageNameLink">
                <div className="eachClass">
                  <img src={pottery} alt="pottery class" className="classThumbnail" />
                  <h2 className="courseName">Pottery</h2>
                </div>
              </Link>
              <p className="dots">{'.'.repeat(20)}</p>
              <p className="classDescription">This is a pottery class to get you started in world of pots. Beginners can start small and graduate</p>
              <div className="socialLinksForCourses">
                <a href="https://github.com/coderacheal" target="blank"><i aria-label="Input Label" className="fa-brands fa-facebook course_socials" /></a>
                <a href="https://twitter.com/racheal_kubi" target="blank"><i aria-label="Input Label" className="fa-brands fa-twitter course_socials" /></a>
                <a href="https://medium.com/@coderacheal" target="blank"><i aria-label="Input Label" className="fa-regular fa-envelope course_socials" /></a>
              </div>
            </div>
            <div>
              <h3>couse 3</h3>
            </div>
            <div>
              <h3>couse 3</h3>
            </div>
            <div>
              <h3>couse 3</h3>
            </div>
          </Slider>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
