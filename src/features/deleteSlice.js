const fetchDelete = (id) => async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/courses/course_id/reservations/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    if (response.ok) {
      window.location.reload();
    }
    return null;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default fetchDelete;
