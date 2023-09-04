import React, { useState, useEffect } from 'react';
import '../styles/MyReservations.css';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    const apiUrl = 'http://localhost:3001/api/v1/courses/course_id/reservations?user_id=1';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data fetched successfully:', data);

        // Modify the reservation date to display only the date part
        const modifiedData = data.map((reservation) => ({
          ...reservation,
          reservation_date: reservation.reservation_date.split('T')[0], // Extract date part
        }));

        setReservations(modifiedData);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }, []);

  return (
    <div className="reservation-list">
      <h2 className="title">My Reservations</h2>
      <div className="reservations-list-items">
        <ul className="reservation-items">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="reservation-item">
              <strong className="label">Course Name:</strong>
              {' '}
              <span className="value">{reservation.course_name}</span>
              <br />
              <strong className="label">Reservation Date:</strong>
              {' '}
              <span className="value">{reservation.reservation_date}</span>
              <br />
              <strong className="label">Price:</strong>
              {' '}
              <span className="value">{reservation.price}</span>
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReservationList;
