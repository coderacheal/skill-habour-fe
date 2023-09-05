/* eslint-disable */
const fetchDelete = async (id, url = 'http://localhost:3001/api/v1/courses/course_id/reservations') => {
  try {
    const newUrl = `${url}?user_id=${id}`;
    const response = await fetch(newUrl, {
      method: 'DELETE',
      mode: 'cors',
    });
    
    // Await the response.json() method
    const json = await response.json();
    
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default fetchDelete;
