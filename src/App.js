import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Reservations from './components/Reservations';
import MyReservations from './components/MyReservations';
import DeleteReservations from './components/DeleteReservations';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/my_reservations" element={<MyReservations />} />
      <Route path="/delete_reservation" element={<DeleteReservations />} />
    </Routes>
  </Router>
);

export default App;
