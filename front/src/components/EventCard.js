import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 120;
const ROTATION_FACTOR = 0.08;
const MAX_AVATARS = 4;

function PlayersSection({ players, maxPlayers }) {
  const joined = players.length;
  const spotsLeft = Math.max(0, maxPlayers - joined);
  const pct = maxPlayers > 0 ? Math.min(100, (joined / maxPlayers) * 100) : 0;
  const full = spotsLeft === 0;
  const visible = players.slice(0, MAX_AVATARS);
  const extra = Math.max(0, joined - MAX_AVATARS);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">
          {joined}/{maxPlayers} jugadores
        </span>
        <span className={full ? 'font-semibold text-emerald-600' : 'text-slate-500'}>
          {full
            ? 'Cupo completo'
            : `Faltan ${spotsLeft} ${spotsLeft === 1 ? 'jugador' : 'jugadores'}`}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {visible.map((p) => (
            <span
              key={p.id}
              title={p.name}
              className={`inline-grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold ring-2 ring-white ${p.color}`}
            >
              {p.initials}
            </span>
          ))}
          {extra > 0 ? (
            <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-slate-800 text-[10px] font-semibold text-white ring-2 ring-white">
              +{extra}
            </span>
          ) : null}
          {joined === 0 ? (
            <span className="text-xs italic text-slate-400">Sé el primero en unirte</span>
          ) : null}
        </div>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              full ? 'bg-emerald-500' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const EventCard = forwardRef(function EventCard(
  { event, isTop, stackIndex, onSwipeComplete },
  ref,
) {
  const cardRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    swipe: (direction) => triggerExit(direction),
  }));

  const triggerExit = (direction) => {
    if (exitDirection) return;
    setExitDirection(direction);
    const flyX = direction === 'right' ? 800 : -800;
    setDrag({ x: flyX, y: drag.y });
    window.setTimeout(() => onSwipeComplete(direction), 320);
  };

  const onPointerDown = (event) => {
    if (!isTop || exitDirection) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startRef.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
  };

  const onPointerMove = (event) => {
    if (!dragging) return;
    setDrag({
      x: event.clientX - startRef.current.x,
      y: event.clientY - startRef.current.y,
    });
  };

  const onPointerUp = (event) => {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragging(false);

    if (drag.x > SWIPE_THRESHOLD) {
      triggerExit('right');
    } else if (drag.x < -SWIPE_THRESHOLD) {
      triggerExit('left');
    } else {
      setDrag({ x: 0, y: 0 });
    }
  };

  const rotation = drag.x * ROTATION_FACTOR;
  const likeOpacity = Math.min(Math.max(drag.x / SWIPE_THRESHOLD, 0), 1);
  const nopeOpacity = Math.min(Math.max(-drag.x / SWIPE_THRESHOLD, 0), 1);

  const depth = stackIndex;
  const baseScale = 1 - depth * 0.04;
  const baseTranslateY = depth * 12;

  const style = {
    transform: exitDirection
      ? `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`
      : isTop
        ? `translate(${drag.x}px, ${drag.y}px) rotate(${rotation}deg)`
        : `translateY(${baseTranslateY}px) scale(${baseScale})`,
    transition: dragging ? 'none' : 'transform 300ms ease-out',
    zIndex: 100 - depth,
    touchAction: 'none',
  };

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 select-none"
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <div
          className={`relative h-56 flex-none overflow-hidden bg-gradient-to-br ${event.gradient}`}
        >
          {event.image && !imageFailed ? (
            <img
              src={event.image}
              alt=""
              draggable={false}
              onError={() => setImageFailed(true)}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span
            className="pointer-events-none absolute left-5 top-5 z-10 rounded-md border-2 border-emerald-400 bg-white/90 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-emerald-500"
            style={{ opacity: likeOpacity, transform: 'rotate(-12deg)' }}
          >
            Me interesa
          </span>
          <span
            className="pointer-events-none absolute right-5 top-5 z-10 rounded-md border-2 border-rose-400 bg-white/90 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-rose-500"
            style={{ opacity: nopeOpacity, transform: 'rotate(12deg)' }}
          >
            Paso
          </span>
          <span className="absolute bottom-4 left-5 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur">
            {event.category}
          </span>
          {(() => {
            const joined = event.players?.length ?? 0;
            const spotsLeft = Math.max(0, (event.maxPlayers ?? 0) - joined);
            const full = spotsLeft === 0;
            return (
              <span
                className={`absolute bottom-4 right-5 z-10 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
                  full ? 'bg-emerald-500/90 text-white' : 'bg-white/90 text-slate-800'
                }`}
              >
                {full ? 'Cupo completo' : `Faltan ${spotsLeft}`}
              </span>
            );
          })()}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-tight text-slate-900">{event.title}</h3>
            <div className="flex flex-none flex-col items-center rounded-lg bg-indigo-950 px-2 py-1 text-center text-white">
              <span className="text-[10px] font-semibold leading-tight">{event.dateLine}</span>
              <span className="text-[10px] font-medium leading-tight text-indigo-200">{event.timeLine}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 line-clamp-2">{event.description}</p>

          <div className="mt-auto space-y-3 border-t border-slate-100 pt-3">
            <PlayersSection players={event.players || []} maxPlayers={event.maxPlayers || 0} />
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" strokeWidth="2" />
              </svg>
              {event.location}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
});

export default EventCard;
