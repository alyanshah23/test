import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage.jsx';
import { HomePage } from './pages/HomePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/dashboard" element={<AdminPage dashboard />} />
    </Routes>
  );
}
