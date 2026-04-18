const menuItems = [
  { id: 'mis-juegos', label: 'Mis Juegos', badge: null },
  { id: 'grupos', label: 'Grupos', badge: 12 },
  { id: 'eventos', label: 'Eventos', badge: 3 },
  { id: 'torneos', label: 'Torneos', badge: null },
  { id: 'tendencias', label: 'Tendencias', badge: null },
];

const suggestedGroups = [
  { id: 'catan', name: 'Amantes de Catan', members: '1.2k miembros' },
  { id: 'estrategia', name: 'Estrategia Profunda', members: '856 miembros' },
  { id: 'cartas', name: 'Juegos de Cartas', members: '3k miembros' },
];

function LeftSidebar() {
  return (
    <aside className="space-y-4" aria-label="Barra lateral izquierda">
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-fuchsia-100 text-sm font-bold text-fuchsia-700">
            JP
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Juan Perez</h2>
            <a className="text-xs text-slate-500 hover:text-slate-700" href="#perfil">
              Ver perfil
            </a>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">156</dt>
            <dd className="text-[11px] text-slate-500">Juegos</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">2.4k</dt>
            <dd className="text-[11px] text-slate-500">Amigos</dd>
          </div>
          <div>
            <dt className="text-lg font-semibold leading-none text-slate-800">89</dt>
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
        <h3 className="text-sm font-semibold text-slate-900">Grupos Sugeridos</h3>
        <ul className="mt-3 space-y-3">
          {suggestedGroups.map((group) => (
            <li key={group.id} className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium leading-tight text-slate-800">{group.name}</p>
                <p className="text-xs text-slate-500">{group.members}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export default LeftSidebar;
