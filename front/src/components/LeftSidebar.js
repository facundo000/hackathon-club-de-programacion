import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forumsApi } from '../api';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'mis-juegos', label: 'Mis Juegos', badge: null, path: '/juegos-favoritos' },
  { id: 'grupos', label: 'Grupos', badge: null, path: null },
  { id: 'eventos', label: 'Eventos', badge: null, path: '/eventos' },
  { id: 'torneos', label: 'Torneos', badge: null, path: null },
  { id: 'tendencias', label: 'Tendencias', badge: null, path: null },
];


function LeftSidebar({ selectedForumId, onForumSelect }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);

  useEffect(() => {
    forumsApi.getAll().then(setForums).catch(() => {});
  }, []);

  const initials = user?.displayName
    ? user.displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.username?.slice(0, 2).toUpperCase() ?? '?';

  const displayName = user?.displayName || user?.username || 'Usuario';

  const handleMenuClick = (item) => {
    if (item.path) navigate(item.path);
  };

  return (
    <aside className="space-y-4" aria-label="Barra lateral izquierda">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-fuchsia-100 text-sm font-bold text-fuchsia-700">
            {initials}
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">{displayName}</h2>
            <Link className="text-xs text-slate-500 hover:text-slate-700" to="/perfil">
              Ver perfil
            </Link>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">7</dt>
            <dd className="text-[11px] text-slate-500">Juegos</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">4</dt>
            <dd className="text-[11px] text-slate-500">Amigos</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">190</dt>
            <dd className="text-[11px] text-slate-500">Partidas</dd>
          </div>
        </dl>
      </section>

      <nav className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm" aria-label="Navegacion lateral">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleMenuClick(item)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-indigo-900 px-2 py-0.5 text-xs font-semibold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Grupos</h3>
          {selectedForumId && (
            <button
              type="button"
              onClick={() => onForumSelect?.(null)}
              className="text-xs text-violet-500 hover:text-violet-700"
            >
              Ver todo
            </button>
          )}
        </div>
        {forums.length === 0 ? (
          <p className="mt-3 text-xs text-slate-400">No hay grupos todavía.</p>
        ) : (
          <ul className="mt-3 space-y-1">
            {forums.map((forum) => {
              const isActive = selectedForumId === forum._id;
              return (
                <li key={forum._id}>
                  <button
                    type="button"
                    onClick={() => onForumSelect?.(isActive ? null : forum._id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition ${
                      isActive
                        ? 'bg-violet-50 ring-1 ring-violet-200'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="h-8 w-8 flex-none rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className={`text-sm font-medium leading-tight ${isActive ? 'text-violet-700' : 'text-slate-800'}`}>
                        {forum.name}
                      </p>
                      {forum.description ? (
                        <p className="truncate text-xs text-slate-500">{forum.description}</p>
                      ) : null}
                    </div>
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

export default LeftSidebar;
