import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courseSlice';

const ReservationForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  const { courses } = useSelector((state) => state.courses);
  const [formData, setFormData] = useState({
    course_name: '', // Use this to store the selected course name
    reservation_date: '',
    price: '',
    course_id: '1',
    user_id: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3001/api/v1/courses/1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reservation was successfully created
        console.log('Reservation created successfully');
        // You can reset the form or redirect the user as needed
      } else {
        // Handle errors here
        console.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Reservation Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course_name">Course Name:</label>
          <select
            id="course_name"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reservation_date">Reservation Date:</label>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit Reservation</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
