import React, { useState, useEffect } from 'react';
import '../styles/MyReservations.css';
import { useSelector } from 'react-redux';
import SignOutButton from './SignOutButton';

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    // Get the user ID from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const userId = loggedInUser ? loggedInUser.id : '';

    // Replace with your actual API endpoint and include the user ID
    const apiUrl = `http://localhost:3001/api/v1/courses/course_id/reservations?user_id=${userId}`;

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
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  // Conditional rendering using if statements
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (reservations.length === 0) {
    content = <p>No reservations available for the user.</p>;
  } else {
    content = (
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
            <strong className="label">Course duration:</strong>
            {' '}
            <span className="value">
              {reservation.price}
              {' '}
              months
            </span>
            <br />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="reservation-list">
      <div className="container">
        <SignOutButton />
        {user ? (
          <div>
            <h2 className="title">My Reservations</h2>
            <div className="reservations-list-items">
              {content}
            </div>
          </div>
        ) : (
          <div className="no-user-my-reservations">
            <p>No user is signed in yet</p>
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationList;
