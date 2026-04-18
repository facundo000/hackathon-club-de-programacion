import { useEffect, useState } from 'react';
import { authApi, eventsApi } from '../api';

const upcomingEvents = [
  { id: 'e1', dateLine: '21 Abr', timeLine: '18:00', title: 'Tarde de Catan en el Café Lúdico', game: 'Catan' },
  { id: 'e2', dateLine: '22 Abr', timeLine: '19:00', title: 'Iniciación a Wingspan', game: 'Wingspan' },
  { id: 'e3', dateLine: '25 Abr', timeLine: '17:00', title: 'Pandemic en línea - Discord', game: 'Pandemic' },
];

const CONTACT_COLORS = [
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-amber-100 text-amber-800',
  'bg-emerald-100 text-emerald-800',
  'bg-violet-100 text-violet-700',
  'bg-fuchsia-100 text-fuchsia-700',
];

function RightSidebar({ selectedAuthorId, onAuthorSelect }) {
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    authApi.getMe().then((profile) => setFollowing(profile.following ?? [])).catch(() => setFollowing([]));
  }, []);

  return (
    <aside className="space-y-4" aria-label="Barra lateral derecha">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Próximos Eventos</h2>
        <ul className="mt-3 space-y-3">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="flex gap-3">
              <div className="flex h-12 w-14 flex-none flex-col items-center justify-center rounded-lg bg-indigo-950 text-center text-white">
                <span className="text-[10px] font-semibold leading-tight">{event.dateLine}</span>
                <span className="text-[10px] font-medium leading-tight text-indigo-200">{event.timeLine}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-slate-800">{event.title}</p>
                <p className="text-xs text-slate-500">{event.game}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center">
          <a className="text-xs font-medium text-indigo-900 hover:underline" href="#eventos">
            Ver todos los eventos
          </a>
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Contactos</h2>
          {selectedAuthorId && (
            <button
              type="button"
              onClick={() => onAuthorSelect?.(null)}
              className="text-xs text-violet-500 hover:text-violet-700"
            >
              Ver todo
            </button>
          )}
        </div>
        {following === null ? (
          <p className="mt-3 text-xs text-slate-400">Cargando...</p>
        ) : following.length === 0 ? (
          <p className="mt-3 text-xs text-slate-400">No seguís a nadie todavía.</p>
        ) : (
          <ul className="mt-3 space-y-1">
            {following.slice(0, 6).map((contact, i) => {
              const name = contact.displayName || contact.username || 'Usuario';
              const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
              const isActive = selectedAuthorId === contact._id;
              return (
                <li key={contact._id}>
                  <button
                    type="button"
                    onClick={() => onAuthorSelect?.(isActive ? null : contact._id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition ${
                      isActive ? 'bg-violet-50 ring-1 ring-violet-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className={`grid h-9 w-9 flex-none place-items-center rounded-full text-xs font-bold ${CONTACT_COLORS[i % CONTACT_COLORS.length]}`}>
                      {initials}
                    </span>
                    <span className={`truncate text-sm ${isActive ? 'font-semibold text-violet-700' : 'text-slate-800'}`}>
                      {name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </aside>
  );
}

export default RightSidebar;
