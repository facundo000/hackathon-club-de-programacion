const upcomingEvents = [
  { id: 'e1', dateLine: '20 Abr', timeLine: '18:00', title: 'Torneo Catan' },
  { id: 'e2', dateLine: '22 Abr', timeLine: '19:30', title: 'Noche de juegos' },
  { id: 'e3', dateLine: '25 Abr', timeLine: '17:00', title: 'Meetup estrategia' },
];

const contacts = [
  { id: 'c1', name: 'María García', initials: 'MG', color: 'bg-rose-100 text-rose-700' },
  { id: 'c2', name: 'Carlos López', initials: 'CL', color: 'bg-sky-100 text-sky-700' },
  { id: 'c3', name: 'Ana Martínez', initials: 'AM', color: 'bg-amber-100 text-amber-800' },
  { id: 'c4', name: 'Luis Rodríguez', initials: 'LR', color: 'bg-emerald-100 text-emerald-800' },
];

function RightSidebar() {
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
        <h2 className="text-sm font-semibold text-slate-900">Contactos</h2>
        <ul className="mt-3 space-y-2">
          {contacts.map((contact) => (
            <li key={contact.id} className="flex items-center gap-3 rounded-lg py-1">
              <span
                className={`grid h-9 w-9 flex-none place-items-center rounded-full text-xs font-bold ${contact.color}`}
              >
                {contact.initials}
              </span>
              <span className="truncate text-sm text-slate-800">{contact.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export default RightSidebar;
