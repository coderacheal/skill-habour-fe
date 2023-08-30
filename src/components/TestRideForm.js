import React, { useState } from 'react';
import '../styles/TestRideForm.css';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reservationDate: '',
    numberOfGuests: 1,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // // Here you can implement the logic to submit the reservation data, e.g. send it to an API.
    // console.log('Form submitted:', formData);
    // // Reset the form data after submission
    setFormData({
      name: '',
      email: '',
      reservationDate: '',
      numberOfGuests: 1,
    });
  };

  return (
    <div className="reservation-form-container">
      <h2>Please Reserve your course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="reservationDate">Reservation Date:</label> */}
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="numberOfGuests">Number of Guests:</label> */}
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <button type="submit">Make Reservation</button>
      </form>
    </div>
  );
};

export default ReservationForm;
