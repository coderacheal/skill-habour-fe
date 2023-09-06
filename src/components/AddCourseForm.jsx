import React, { useState } from 'react';
import SignOutButton from './SignOutButton';
// import { addNewCourse } from '../features/courseSlice';// this will be gained from rudux after api done

const AddCourseForm = () => {
  const [addFormNotice, setaddFormNotice] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleErrorCourseNotice = () => {
    setaddFormNotice('Could not add course')
  }

  const handleAddCourseNotice = () => {
    setaddFormNotice('Course added successfully!')
  }

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
        handleAddCourseNotice()
      } else {
        handleErrorCourseNotice()
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
          <p>{addFormNotice}</p>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-3">
              <label htmlFor="coursename" className="form-label text-primary">
                Course Name
                {' '}
                <br />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  name="description"
                  className="form-control"
                  onChange={handleChange}
                  id="coursePrice"
                  value={formData.description}
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
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
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
                  name="price"
                  className="form-control"
                  id="courseDescription"
                  onChange={handleChange}
                  value={formData.price}
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
