import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courseSlice';
import '../styles/ReservationForm.css';

const ReservationForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const { courses } = useSelector((state) => state.courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_name: '',
    reservation_date: '',
    price: '',
    user_id: '1',
  });

  const [reservationStatus, setReservationStatus] = useState('');

  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0]);
    }
  }, [courses, selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const course = courses.find((course) => course.name === value);

    setSelectedCourse(course);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      setReservationStatus('Please select a course');
      return;
    }

    formData.course_id = selectedCourse.id;

    try {
      const response = await fetch(`http://127.0.0.1:3001/api/v1/courses/${formData.course_id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setReservationStatus('Course successfully enrolled');
        // Reset the form
        setFormData({
          course_name: '',
          reservation_date: '',
          price: '',
          user_id: '1',
        });
      } else {
        setReservationStatus('Failed to create reservation');
      }
    } catch (error) {
      setReservationStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="reservation-container">
      <h2>Reservation Form</h2>
      {reservationStatus && (
        <p className={reservationStatus.includes('Error') ? 'error-message' : 'success-message'}>
          {reservationStatus}
        </p>
      )}
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="course_name">Select a Course:</p>
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
        <div className="form-group">
          <p className="reservation_date">Select Reservation Date:</p>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <p className="price">Price:</p>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit Reservation</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
