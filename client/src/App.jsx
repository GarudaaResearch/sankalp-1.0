import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import TrackInfo from './pages/TrackInfo';
import FloatingHome from './components/FloatingHome';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tracks/:slug" element={<TrackInfo />} />
      </Routes>
      <FloatingHome />
    </BrowserRouter>
  );
}
