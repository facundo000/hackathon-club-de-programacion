import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import FavoriteGamesPage from './pages/FavoriteGamesPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/eventos" element={<EventsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/juegos-favoritos" element={<FavoriteGamesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
