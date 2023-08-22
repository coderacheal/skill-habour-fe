import React from 'react';
import Slider from 'react-slick';
import Dashboard from './Dashboard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CustomNextArrow, CustomPrevArrow } from './CarouselArrows';

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
        <h1>Available Courses</h1>
        <p>Please select a course you would like to take</p>
        <div className="sliderDiv">
          <Slider {...settings} className="slider">
            <div>
              <h3>couse 1</h3>
            </div>
            <div>
              <h3>couse 2</h3>
            </div>
            <div>
              <h3>couse 3</h3>
            </div>
            <div>
              <h3>couse 4</h3>
            </div>
            <div>
              <h3>couse 5</h3>
            </div>
            <div>
              <h3>couse 6</h3>
            </div>
          </Slider>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
