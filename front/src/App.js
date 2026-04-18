import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import AppHeader from './components/AppHeader';
import boardgameImage from './assets/boardgameimages.webp';
import LeftSidebar from './components/LeftSidebar';
import PostCard from './components/PostCard';
import PostComposer from './components/PostComposer';
import RightSidebar from './components/RightSidebar';

/** Feed temporal — sustituir por datos del API */
const FEED_POSTS = [
  {
    id: '1',
    forumName: 'Eurogames',
    authorName: 'Laura Méndez',
    timeAgo: 'Hace 2 horas',
    content:
      'Partida increíble de Wingspan con la expansión Asia. La estrategia de las cartas de objetivo cambió todo el ritmo de la mesa. ¿Alguien más la ha probado ya?',
    imageSrc: boardgameImage,
    imageAlt: 'Juegos de mesa sobre la mesa',
    upvoteCount: 24,
  },
  {
    id: '2',
    forumName: 'Party games',
    authorName: 'Sofía Díaz',
    timeAgo: 'Hace 5 min',
    content:
      'Organizamos noche de Dixit este viernes en el café de siempre. Plazas limitadas — escribid por MD.',
    upvoteCount: 8,
  },
  {
    id: '3',
    forumName: 'Cooperativos',
    authorName: 'Marta Gómez',
    timeAgo: 'Hace 1 hora',
    content:
      '¿Alguien para Pandemic Legacy temporada 2 los domingos por la tarde? Vamos por la mitad de la campaña y buscamos sustituto estable.',
    upvoteCount: 15,
  },
  {
    id: '4',
    forumName: 'Torneos y ligas',
    authorName: 'Juan Diego Ruiz',
    timeAgo: 'Ayer',
    content:
      'Publicadas las parejas del torneo de Carcassonne del mes. Revisad el bracket en el post fijado del foro. ¡Suerte a todos!',
    imageSrc: boardgameImage,
    imageAlt: 'Mesa con juegos de mesa',
    upvoteCount: 42,
  },
  {
    id: '5',
    forumName: 'Novedades',
    authorName: 'Ana Flores',
    timeAgo: 'Hace 3 días',
    content:
      'Reseña rápida de Azul: Vitral — visualmente espectacular; si os gustó el original, merece al menos una partida de prueba.',
    upvoteCount: 31,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Dashboardd" element={<DashboardPage />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/Dashboardd" replace />} />
        <Route path="*" element={<Navigate to="/Dashboardd" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
