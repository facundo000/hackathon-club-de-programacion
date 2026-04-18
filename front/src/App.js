import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboardd" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/Dashboardd" replace />} />
        <Route path="*" element={<Navigate to="/Dashboardd" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
