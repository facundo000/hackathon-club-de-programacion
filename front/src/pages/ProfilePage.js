import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LeftSidebar from '../components/LeftSidebar';
import ProfileEditModal from '../components/ProfileEditModal';
import RightSidebar from '../components/RightSidebar';
import { useProfile } from '../context/ProfileContext';
import { useState } from 'react';

function initialsFromName(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (partial) => {
    setProfile((prev) => ({
      ...prev,
      ...partial,
      favoriteGames: partial.favoriteGames.map((g) => ({
        ...g,
        note: prev.favoriteGames.find((x) => x.title === g.title)?.note ?? g.note ?? '',
      })),
      myGames: partial.myGames.map((g) => ({
        ...g,
        acquired: prev.myGames.find((x) => x.title === g.title)?.acquired ?? g.acquired ?? '',
      })),
    }));
  };

  const previewFavorites = profile.favoriteGames.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
          <div className="order-2 lg:order-none">
            <LeftSidebar />
          </div>

          <div className="order-1 space-y-5 lg:order-none">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Mi perfil</h1>
                <p className="text-sm text-slate-500">Información visible para la comunidad</p>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="inline-flex items-center justify-center rounded-lg bg-indigo-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Editar datos
              </button>
            </header>

            <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-950/5 to-fuchsia-500/10 px-5 py-6 sm:px-6">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  <div className="relative shrink-0">
                    {profile.imageUrl ? (
                      <img
                        src={profile.imageUrl}
                        alt={`Foto de ${profile.name}`}
                        className="h-28 w-28 rounded-2xl border border-slate-200 object-cover shadow-sm sm:h-32 sm:w-32"
                      />
                    ) : (
                      <span className="grid h-28 w-28 place-items-center rounded-2xl border border-slate-200 bg-gradient-to-br from-fuchsia-400 to-indigo-900 text-2xl font-bold text-white shadow-sm sm:h-32 sm:w-32">
                        {initialsFromName(profile.name)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-semibold text-slate-900">{profile.name}</h2>
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-slate-600 sm:justify-start">
                      <svg aria-hidden className="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" strokeWidth="2" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="2.5" strokeWidth="2" />
                      </svg>
                      {profile.locality}
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="fav-heading">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id="fav-heading" className="text-base font-semibold text-slate-900">
                    Juegos favoritos
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Vista rápida; la lista completa está en su propia página.
                  </p>
                </div>
                <Link
                  to="/juegos-favoritos"
                  className="shrink-0 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-950 transition hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                >
                  Ver página de favoritos
                </Link>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {previewFavorites.map((game) => (
                  <li
                    key={game.id}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-800"
                  >
                    {game.title}
                  </li>
                ))}
              </ul>
              {profile.favoriteGames.length > previewFavorites.length ? (
                <p className="mt-3 text-xs text-slate-500">
                  +{profile.favoriteGames.length - previewFavorites.length} más en la página dedicada.
                </p>
              ) : null}
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="owned-heading">
              <h2 id="owned-heading" className="text-base font-semibold text-slate-900">
                Mis juegos
              </h2>
              <p className="mt-1 text-sm text-slate-500">Tu biblioteca registrada en BoardGame Social</p>
              <ul className="mt-4 divide-y divide-slate-100">
                {profile.myGames.map((game) => (
                  <li key={game.id} className="flex items-center justify-between gap-3 py-3 first:pt-0">
                    <span className="font-medium text-slate-800">{game.title}</span>
                    {game.acquired ? (
                      <span className="text-xs tabular-nums text-slate-400">{game.acquired}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="order-3 lg:order-none">
            <RightSidebar />
          </div>
        </div>
      </main>

      <ProfileEditModal
        open={editOpen}
        initialProfile={profile}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default ProfilePage;
