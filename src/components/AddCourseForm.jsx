import React, { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import SignOutButton from './SignOutButton';

const AddCourseForm = () => {
  const user = useSelector((store) => store.auth.user);
  const [addFormNotice, setaddFormNotice] = useState('');
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
    setaddFormNotice('Could not add course');
  };

  const handleAddCourseNotice = () => {
    setaddFormNotice('Course added successfully!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://skill-habour.onrender.com/api/v1/courses', {
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
        handleAddCourseNotice();
      } else {
        handleErrorCourseNotice();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-course">
      <SignOutButton />
      <div className="row">
        {user ? (
          <div className="">
            <h1 className="add-course-ribbon">Add New Course</h1>
            <p>{addFormNotice}</p>
            <form onSubmit={handleSubmit} className="">
              <div className="">
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
                    placeholder="Enter course price"
                  />
                </label>
              </div>
              <div className="">
                <button type="submit" className="btn btn-primary add-course-btn" value="Add Course">Add course</button>
              </div>
            </form>
          </div>
        ) : (
          <p>Admin not logged in</p>
        )}

      </div>
    </div>
  );
};

export default AddCourseForm;
