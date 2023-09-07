import React from 'react';
import PropTypes from 'prop-types';

export const CustomPrevArrow = ({ onClick }) => (
  <div
    className="custom-prev-arrow"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === 'Space') {
        onClick(e);
      }
    }}
    role="button"
    tabIndex={0} // Add tabIndex to make it focusable
  >
    <i aria-label="Input Label" className="fa-solid fa-arrow-left left" />
  </div>
);

export const CustomNextArrow = ({ onClick }) => (
  <div
    className="custom-next-arrow"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === 'Space') {
        onClick(e);
      }
    }}
    role="button"
    tabIndex={0} // Add tabIndex to make it focusable
  >
    <i aria-label="Input Label" className="fa-solid fa-arrow-right right" />
  </div>
);

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired, // Validate that onClick is a required function prop
};

CustomNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired, // Validate that onClick is a required function prop
};
