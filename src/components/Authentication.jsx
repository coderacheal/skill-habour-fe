import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

const Authentication = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',

  });
  // const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        console.log('Registration successful:', data);
        // Redirect or show success message
      } else {
        const errorData = await response.json();
        console.log(formData);
        console.error('Registration error:', errorData);
        // Handle error (show error message)
      }
    } catch (error) {
      console.error('Registration error:', error);
      console.log(formData);
      // Handle network or other errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="username" />
      {' '}
      <br />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email" />
      {' '}
      <br />
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="password" />
      <br />
      <input
        type="password"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleInputChange}
        placeholder="confirm"
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Authentication;
