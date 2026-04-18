import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useProfile } from '../context/ProfileContext';

function FavoriteGamesPage() {
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar />
          </div>

          <div className="order-1 space-y-5 lg:order-none">
            <header>
              <Link
                to="/perfil"
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Volver al perfil
              </Link>
              <h1 className="mt-3 text-xl font-semibold text-slate-900">Juegos favoritos</h1>
              <p className="mt-1 text-sm text-slate-500">
                Lista completa. Podés editarla desde el formulario de perfil.
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              {profile.favoriteGames.map((game) => (
                <article
                  key={game.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                >
                  <h2 className="text-lg font-semibold leading-tight text-slate-900">{game.title}</h2>
                  {game.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{game.note}</p>
                  ) : (
                    <p className="mt-2 text-sm text-slate-400">Sin nota</p>
                  )}
                  <span className="mt-4 inline-flex w-fit rounded-full bg-fuchsia-50 px-2.5 py-0.5 text-xs font-medium text-fuchsia-800">
                    Favorito
                  </span>
                </article>
              ))}
            </div>

            {profile.favoriteGames.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                Todavía no cargaste favoritos. Editá tu perfil para agregar juegos.
              </div>
            ) : null}
          </div>

          <div className="order-3 lg:order-none">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default FavoriteGamesPage;
