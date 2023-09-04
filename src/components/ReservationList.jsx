import React, { useState, useEffect } from 'react';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Replace with your actual API endpoint
    const apiUrl = 'http://localhost:3001/api/v1/courses/course_id/reservations?user_id=1';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
      });
  }, []);
  return (
    <div>
      <h2>Reservations for User ID 1</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <strong>Course Name:</strong>
            {' '}
            {reservation.course_name}
            <br />
            <strong>Reservation Date:</strong>
            {' '}
            {reservation.reservation_date}
            <br />
            <strong>Price:</strong>
            {' '}
            {reservation.price}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
