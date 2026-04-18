import logoBoardGame from '../assets/2RecursoLogo2.svg';

const iconBaseClass =
  'h-5 w-5 text-slate-900 transition group-hover:text-slate-700 group-focus-visible:text-slate-700';

function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white px-3 py-2 sm:px-4">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-3 md:flex-nowrap">
        <a className="flex min-w-0 items-center gap-2" href="#inicio">
          <img
            src={logoBoardGame}
            alt="BoardGame Social"
            className="h-8 w-auto sm:h-9"
          />
          <span className="sr-only">BoardGame Social</span>
        </a>

        <div className="order-3 w-full md:order-none md:flex-1">
          <label className="sr-only" htmlFor="search">
            Buscar juegos, personas y grupos
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-slate-400">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 21l-4.3-4.3m1.3-5.2a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" />
              </svg>
            </span>
            <input
              id="search"
              type="search"
              placeholder="Buscar juegos, personas, grupos..."
              className="h-10 w-full rounded-full bg-slate-100 pl-10 pr-4 text-sm text-slate-900 outline-none ring-violet-500 transition placeholder:text-slate-500 focus:ring-2"
            />
          </div>
        </div>

        <nav aria-label="Acciones principales" className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="group rounded-md p-2 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Inicio"
          >
            <svg aria-hidden="true" className={iconBaseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 11.5l9-7 9 7M5.5 10v10h13V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="group rounded-md p-2 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Amistades"
          >
            <svg aria-hidden="true" className={iconBaseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8 11a3 3 0 100-6 3 3 0 000 6zM16.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" strokeWidth="2" />
              <path d="M2.5 19c.8-3 3.1-4.5 5.5-4.5S12.7 16 13.5 19M13.5 19c.6-2.1 2.1-3.3 4-3.3 1.9 0 3.4 1.2 4 3.3" strokeWidth="2" />
            </svg>
          </button>
          <button
            type="button"
            className="group rounded-md p-2 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Mensajes"
          >
            <svg aria-hidden="true" className={iconBaseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 4.5h14a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H9l-5.5 3v-13A1.5 1.5 0 015 4.5z" strokeWidth="2" />
            </svg>
          </button>
          <button
            type="button"
            className="group relative rounded-md p-2 outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Notificaciones"
          >
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
            <svg aria-hidden="true" className={iconBaseClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M12 4a5 5 0 00-5 5v3.7L5 15v1h14v-1l-2-2.3V9a5 5 0 00-5-5zM9.5 18a2.5 2.5 0 005 0"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="rounded-full border border-fuchsia-300 bg-fuchsia-100 p-0.5 outline-none transition hover:bg-fuchsia-200 focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Perfil de usuario"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fuchsia-500 text-xs font-bold text-white">
              Y
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
