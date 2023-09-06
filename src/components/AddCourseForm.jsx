import React, { useState } from 'react';
import SignOutButton from './SignOutButton';// this will be gained from rudux after api done

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '', // Change the state key to price
    price: '', // Set the user ID from local storage
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3001/api/v1/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          description: '',
          image: '',
          price: '',
        });
      } else {
      }
    } catch (error) {
    }
  };
  return (
    <div className="add-course">
      <SignOutButton />
      <div className="row">
        <div className="">
          <div className="alert alert-success">{}</div>
          <div className="alert alert-danger">{}</div>
          <h1 className="text-primary">Add New Course</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
              <label htmlFor="coursename" className="form-label text-primary">
                Course Name
                {' '}
                <br />
                <input
                  type="text"
                  name="name"
                  id="coursename"
                  className="form-control"
                  placeholder="Enter Course Name"
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="coursePrice" className="form-label text-primary">
                Course Description
                {' '}
                <br />
                <textarea
                  name="price"
                  className="form-control"
                  id="coursePrice"
                  placeholder="Enter Course Description"
                />
              </label>
            </div>

            <div className="">
              <label htmlFor="carImage" className="form-label text-primary">
                Course Image
                {' '}
                <br />
                <input
                  type="text"
                  name="photo"
                  className="form-control"
                  id="courseImage"
                  placeholder="Enter your image url"
                />

              </label>
            </div>

            <div className="">
              <label htmlFor="courseDescription" className="form-label text-primary">
                Course Price
                {' '}
                <br />

                <input
                  name="description"
                  className="form-control"
                  id="courseDescription"
                  rows="3"
                />
              </label>
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary" value="Add Course" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;
