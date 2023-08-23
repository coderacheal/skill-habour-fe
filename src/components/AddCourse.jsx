import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddnewCourse } from '../features/CoursesSlice'; // this will be gained from rudux after api done

const AddCourse = () => {
  const dispatch = useDispatch();
  const storage = localStorage.getItem('token');
  const user = JSON.parse(storage);
  const [courseDatas, setCourseDatas] = useState({
    name: '',
    description: '',
    photo: '',
    price: '',
    user_id: user.id || null,
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseDatas.name || !courseDatas.price || !courseDatas.model || !courseDatas.photo) {
      setError('Please Fill All The Fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    const formData = new FormData();

    formData.append('course[name]', courseDatas.name);
    formData.append('course[description]', courseDatas.description);
    formData.append('course[photo]', courseDatas.photo);
    formData.append('course[price]', courseDatas.price);
    formData.append('course[user_id]', courseDatas.user_id);

    await dispatch(AddnewCourse(formData));
    setCourseDatas({
      name: '',
      description: '',
      photo: '',
      price: '',
    });
    setSuccess('Course Added Successfully');
    navigate('/');
  };

  const handleChange = (e) => {
    setCourseDatas({ ...courseDatas, [e.target.name]: e.target.value });
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
              <label htmlFor="coursename" className="form-label text-primary">
                Course Name
                <input
                  type="text"
                  name="name"
                  value={courseDatas.name}
                  onChange={handleChange}
                  id="coursename"
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
                  value={courseDatas.price}
                  onChange={handleChange}
                  className="form-control"
                  id="coursePrice"
                  placeholder="Enter Course Price"
                />
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="carImage" className="form-label text-primary">
                Course Image

                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setCarDatas({ ...courseDatas, photo: file });
                  }}
                  className="form-control"
                  id="courseImage"
                  placeholder="Enter your image url"
                />

              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="courseDescription" className="form-label text-primary">
                Course Description

                <textarea
                  name="description"
                  value={courseDatas.description}
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