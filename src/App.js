import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Reservations from './components/Reservations';
import MyReservations from './components/MyReservations';
import DeleteReservations from './components/DeleteReservations';
import HomePage from './components/HomePage';
import CourseDetails from './components/CourseDetails';
import Authentication from './components/Authentication';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<HomePage />} />
      <Route path="/courses/:courseName" element={<CourseDetails />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/my_reservations" element={<MyReservations />} />
      <Route path="/delete_reservation" element={<DeleteReservations />} />
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  </Router>
);

export default App;
