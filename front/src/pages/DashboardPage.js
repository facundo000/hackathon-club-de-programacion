import boardgameImage from '../assets/boardgameimages.webp';
import AppHeader from '../components/AppHeader';
import LeftSidebar from '../components/LeftSidebar';
import PostCard from '../components/PostCard';
import PostComposer from '../components/PostComposer';
import RightSidebar from '../components/RightSidebar';

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

function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar />
          </div>
          <div className="order-1 space-y-5 lg:order-none">
            <PostComposer />
            <section aria-label="Publicaciones" className="space-y-5">
              {FEED_POSTS.map((post) => (
                <PostCard
                  key={post.id}
                  forumName={post.forumName}
                  authorName={post.authorName}
                  timeAgo={post.timeAgo}
                  content={post.content}
                  imageSrc={post.imageSrc}
                  imageAlt={post.imageAlt}
                  upvoteCount={post.upvoteCount}
                />
              ))}
            </section>
          </div>
          <div className="order-3 lg:order-none">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
