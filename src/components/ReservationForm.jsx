import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/ReservationForm.css';

const ReservationForm = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const userId = loggedInUser ? loggedInUser.id : ''; // Get the user ID

  const { courses } = useSelector((state) => state.courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_name: '',
    reservation_date: '',
    price: '', // Change the state key to price
    user_id: userId, // Set the user ID from local storage
  });

  const [reservationStatus, setReservationStatus] = useState('');

  useEffect(() => {
    if (courses.length > 0 && !selectedCourse) {
      setSelectedCourse(courses[0]);
    }
  }, [courses, selectedCourse]);

  // Function to get the current date in the required format (YYYY-MM-DD)
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
      const response = await fetch(`https://skill-habour.onrender.com/api/v1/courses/${formData.course_id}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setReservationStatus('Course successfully enrolled');
        // Reset the form, including the price field
        setFormData({
          course_name: '',
          reservation_date: '',
          price: '', // Reset to empty
          user_id: userId,
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
          <p className="course_name">Select a Course</p>
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
          <p className="reservation_date">Select Reservation Date</p>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
            min={getCurrentDate()} // Restrict date selection to today and future dates
          />
        </div>
        <div className="form-group">
          <p className="price">Course Duration:</p>
          <select
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Duration</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Submit Reservation</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
