import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewCourse } from '../features/addCoureSlice';

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const storage = localStorage.getItem('token');
  // const user = JSON.parse(storage);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    // user_id: user.id || null,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseData.name || !courseData.price || !courseData.image) {
      setError('Please Fill All The Fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    const formData = new FormData();

    formData.append('course[name]', courseData.name);
    formData.append('course[description]', courseData.description);
    formData.append('course[image]', courseData.image);
    formData.append('course[price]', courseData.price);

    await dispatch(addNewCourse(formData));
    setCourseData({
      name: '',
      description: '',
      image: '',
      price: '',
    });
    setSuccess('Course Added Successfully');
    navigate('/');
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, image: file });
  };

  return (
    <section className="container w-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-10 w-100">
          {success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <h1 className="text-primary">Add New Course</h1>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="mb-3">
              <label htmlFor="courseName" className="form-label text-primary">
                Course Name
                <input
                  type="text"
                  name="name"
                  value={courseData.name}
                  onChange={handleChange}
                  id="courseName"
                  className="form-control"
                  placeholder="Enter Course Name"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="coursePrice" className="form-label text-primary">
                Course Price
                <input
                  type="number"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  className="form-control"
                  id="coursePrice"
                  placeholder="Enter Course Price"
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="courseImage" className="form-label text-primary">
                Course Image
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control"
                  id="courseImage"
                  placeholder="Upload Course Image"
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="courseDescription" className="form-label text-primary">
                Course Description
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
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
    </section>
  );
};

export default AddCourse;
