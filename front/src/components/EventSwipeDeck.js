import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const USER_POOL = [
  { id: 'u1',  name: 'María García',      initials: 'MG', color: 'bg-rose-200 text-rose-800' },
  { id: 'u2',  name: 'Carlos López',      initials: 'CL', color: 'bg-sky-200 text-sky-800' },
  { id: 'u3',  name: 'Ana Martínez',      initials: 'AM', color: 'bg-amber-200 text-amber-800' },
  { id: 'u4',  name: 'Luis Rodríguez',    initials: 'LR', color: 'bg-emerald-200 text-emerald-800' },
  { id: 'u5',  name: 'Sofía Fernández',   initials: 'SF', color: 'bg-fuchsia-200 text-fuchsia-800' },
  { id: 'u6',  name: 'Diego Pérez',       initials: 'DP', color: 'bg-indigo-200 text-indigo-800' },
  { id: 'u7',  name: 'Valentina Suárez',  initials: 'VS', color: 'bg-orange-200 text-orange-800' },
  { id: 'u8',  name: 'Mateo Ruiz',        initials: 'MR', color: 'bg-teal-200 text-teal-800' },
  { id: 'u9',  name: 'Julieta Benítez',   initials: 'JB', color: 'bg-pink-200 text-pink-800' },
  { id: 'u10', name: 'Tomás Romero',      initials: 'TR', color: 'bg-cyan-200 text-cyan-800' },
  { id: 'u11', name: 'Camila Acosta',     initials: 'CA', color: 'bg-violet-200 text-violet-800' },
  { id: 'u12', name: 'Nicolás Ibáñez',    initials: 'NI', color: 'bg-lime-200 text-lime-800' },
];

const pick = (indices) => indices.map((i) => USER_POOL[i]);

const BASE_EVENTS = [
  {
    title: 'Torneo de Catan',
    category: 'Torneo',
    dateLine: '20 Abr',
    timeLine: '18:00',
    description: 'Competencia clásica con premios para los tres primeros puestos. Inscripción abierta para jugadores de todos los niveles.',
    location: 'Club Central',
    players: pick([0, 1, 3, 5, 7]),
    maxPlayers: 8,
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Noche de Magic: The Gathering',
    category: 'Cartas',
    dateLine: '22 Abr',
    timeLine: '19:30',
    description: 'Draft con el último set y mesas libres para jugar commander. Traé tu mazo o armá uno en el lugar.',
    location: 'Bar Los Dados',
    players: pick([2, 4, 6]),
    maxPlayers: 8,
    gradient: 'from-fuchsia-500 via-purple-600 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1529480780520-8b4d69ffa271?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Campeonato de Ajedrez',
    category: 'Estrategia',
    dateLine: '25 Abr',
    timeLine: '17:00',
    description: 'Sistema suizo a 5 rondas, ritmo 15+5. Abierto a todas las categorías, ideal para sumar rating.',
    location: 'Centro Cultural',
    players: pick([0, 2, 4, 6, 8, 10, 11]),
    maxPlayers: 16,
    gradient: 'from-slate-700 via-slate-900 to-black',
    image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Meetup de Juegos Indie',
    category: 'Reunión',
    dateLine: '27 Abr',
    timeLine: '20:00',
    description: 'Probá prototipos de autores locales y charlá con los diseñadores. Pizza y cerveza de por medio.',
    location: 'Espacio Maker',
    players: pick([1, 3, 5, 7, 9, 11]),
    maxPlayers: 12,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Noche de Dungeons & Dragons',
    category: 'Rol',
    dateLine: '29 Abr',
    timeLine: '21:00',
    description: 'One-shot para principiantes con personajes pregenerados. DM experimentado y sesiones de 3 horas.',
    location: 'Librería Nocturna',
    players: pick([0, 4, 8]),
    maxPlayers: 5,
    gradient: 'from-rose-500 via-red-600 to-purple-700',
    image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Torneo de Risk Legacy',
    category: 'Estrategia',
    dateLine: '02 May',
    timeLine: '16:00',
    description: 'Arrancamos una campaña completa desde cero. Cupos limitados, compromiso de asistir a todas las sesiones.',
    location: 'Club Central',
    players: pick([2, 5, 9, 10, 11]),
    maxPlayers: 5,
    gradient: 'from-red-500 via-orange-600 to-yellow-500',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Jornada de Wargames',
    category: 'Miniaturas',
    dateLine: '04 May',
    timeLine: '14:00',
    description: 'Warhammer 40k y Age of Sigmar. Traé tu ejército pintado y participá de la votación de mejor pintura.',
    location: 'Salón Hobbies',
    players: pick([1, 3, 6, 7]),
    maxPlayers: 10,
    gradient: 'from-cyan-500 via-blue-600 to-indigo-800',
    image: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Mesa abierta de Gloomhaven',
    category: 'Cooperativo',
    dateLine: '06 May',
    timeLine: '19:00',
    description: 'Campaña en curso buscando dos jugadores más. Nivel medio, se enseña la mecánica a quien no conozca.',
    location: 'Café Tablero',
    players: pick([4]),
    maxPlayers: 4,
    gradient: 'from-lime-400 via-emerald-500 to-green-700',
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?auto=format&fit=crop&w=900&q=80',
  },
];

function buildBatch(batchIndex) {
  return BASE_EVENTS.map((ev, i) => ({ ...ev, id: `evt-${batchIndex}-${i}` }));
}

function EventSwipeDeck() {
  const [deck, setDeck] = useState(() => [...buildBatch(0), ...buildBatch(1)]);
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState([]);
  const [rejected, setRejected] = useState([]);
  const topRef = useRef(null);
  const batchRef = useRef(2);

  const visible = useMemo(() => deck.slice(index, index + 3), [deck, index]);

  const handleSwipeComplete = (direction, event) => {
    if (direction === 'right') setLiked((prev) => [...prev, event]);
    else setRejected((prev) => [...prev, event]);

    const nextIndex = index + 1;
    setIndex(nextIndex);

    if (deck.length - nextIndex <= 4) {
      setDeck((prev) => [...prev, ...buildBatch(batchRef.current++)]);
    }
  };

  const triggerSwipe = (direction) => {
    if (topRef.current) topRef.current.swipe(direction);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Eventos para vos</h2>
          <p className="text-sm text-slate-500">Deslizá a la derecha si te interesa, a la izquierda si no.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-semibold text-emerald-700">
            {liked.length} me interesa
          </span>
          <span className="rounded-full bg-rose-100 px-2.5 py-1 font-semibold text-rose-700">
            {rejected.length} descartados
          </span>
        </div>
      </header>

      <div className="relative mx-auto h-[520px] w-full max-w-md">
        {visible.length === 0 ? (
          <div className="grid h-full place-items-center rounded-2xl border border-dashed border-slate-300 text-slate-400">
            No hay más eventos por ahora.
          </div>
        ) : (
          visible
            .slice()
            .reverse()
            .map((event, i) => {
              const stackIndex = visible.length - 1 - i;
              const isTop = stackIndex === 0;
              return (
                <EventCard
                  key={event.id}
                  ref={isTop ? topRef : null}
                  event={event}
                  isTop={isTop}
                  stackIndex={stackIndex}
                  onSwipeComplete={(dir) => handleSwipeComplete(dir, event)}
                />
              );
            })
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => triggerSwipe('left')}
          className="grid h-14 w-14 place-items-center rounded-full border border-rose-200 bg-white text-rose-500 shadow-sm transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          aria-label="Descartar evento"
        >
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => triggerSwipe('right')}
          className="grid h-14 w-14 place-items-center rounded-full border border-emerald-200 bg-white text-emerald-500 shadow-sm transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Marcar como interesante"
        >
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 5.5 6.5 5.5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.5 4 4 7-2.5 4.15-9.5 8.5-9.5 8.5z" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default EventSwipeDeck;
