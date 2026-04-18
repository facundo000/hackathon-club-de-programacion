import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 120;
const ROTATION_FACTOR = 0.08;

const EventCard = forwardRef(function EventCard(
  { event, isTop, stackIndex, onSwipeComplete },
  ref,
) {
  const cardRef = useRef(null);
  const startRef = useRef({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);

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
          className={`relative h-56 flex-none bg-gradient-to-br ${event.gradient}`}
          aria-hidden="true"
        >
          <span
            className="pointer-events-none absolute left-5 top-5 rounded-md border-2 border-emerald-400 bg-white/80 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-emerald-500"
            style={{ opacity: likeOpacity, transform: 'rotate(-12deg)' }}
          >
            Me interesa
          </span>
          <span
            className="pointer-events-none absolute right-5 top-5 rounded-md border-2 border-rose-400 bg-white/80 px-3 py-1 text-lg font-extrabold uppercase tracking-wider text-rose-500"
            style={{ opacity: nopeOpacity, transform: 'rotate(12deg)' }}
          >
            Paso
          </span>
          <span className="absolute bottom-4 left-5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white backdrop-blur">
            {event.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold leading-tight text-slate-900">{event.title}</h3>
            <div className="flex flex-none flex-col items-center rounded-lg bg-indigo-950 px-2 py-1 text-center text-white">
              <span className="text-[10px] font-semibold leading-tight">{event.dateLine}</span>
              <span className="text-[10px] font-medium leading-tight text-indigo-200">{event.timeLine}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">{event.description}</p>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" strokeWidth="2" />
              </svg>
              {event.location}
            </span>
            <span className="font-medium text-slate-700">{event.attendees} asistentes</span>
          </div>
        </div>
      </article>
    </div>
  );
});

export default EventCard;
