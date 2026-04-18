import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/** Mock: mezcla de solicitudes de amistad y avisos de eventos */
const MOCK_ITEMS = [
  {
    id: 'n1',
    type: 'friend_request',
    title: 'Nueva solicitud de amistad',
    body: 'María García quiere conectar contigo.',
    time: 'Hace 12 min',
    unread: true,
  },
  {
    id: 'n2',
    type: 'friend_accept',
    title: 'Solicitud aceptada',
    body: 'Carlos López aceptó tu solicitud. ¡Ya podés ver su biblioteca!',
    time: 'Hace 1 h',
    unread: true,
  },
  {
    id: 'n3',
    type: 'event_invite',
    title: 'Invitación a evento',
    body: 'Te invitaron al torneo de Carcassonne del Club Central (sábado 18:00).',
    time: 'Hace 2 h',
    unread: true,
  },
  {
    id: 'n4',
    type: 'event_reminder',
    title: 'Recordatorio',
    body: 'Mañana a las 19:30: Noche de juegos en Bar Los Dados.',
    time: 'Hace 4 h',
    unread: false,
  },
  {
    id: 'n5',
    type: 'friend_request',
    title: 'Nueva solicitud de amistad',
    body: 'Ana Martínez te envió una solicitud.',
    time: 'Ayer',
    unread: false,
  },
];

function typeIcon(type) {
  if (type === 'friend_accept') {
    return (
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 13l4 4L19 7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (type === 'friend_request') {
    return (
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fuchsia-100 text-fuchsia-700" aria-hidden="true">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 11a3 3 0 100-6 3 3 0 000 6zM16.5 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" strokeWidth="2" />
          <path d="M2.5 19c.8-3 3.1-4.5 5.5-4.5S12.7 16 13.5 19M13.5 19c.6-2.1 2.1-3.3 4-3.3 1.9 0 3.4 1.2 4 3.3" strokeWidth="2" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-900" aria-hidden="true">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M8 7V5a4 4 0 118 0v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function NotificationsDropdown({ open, onClose, anchorRef }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (panelRef.current?.contains(t)) return;
      if (anchorRef?.current?.contains(t)) return;
      onClose();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      id="notifications-panel"
      role="dialog"
      aria-label="Notificaciones"
      className="absolute right-0 top-[calc(100%+0.5rem)] z-[90] w-[min(100vw-1.5rem,22rem)] origin-top-right rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10"
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">Notificaciones</h2>
        <p className="text-xs text-slate-500">Solicitudes de amistad y eventos</p>
      </div>
      <ul className="max-h-[min(70vh,20rem)] divide-y divide-slate-100 overflow-y-auto overscroll-contain">
        {MOCK_ITEMS.map((item) => (
          <li key={item.id}>
            <div
              className={`flex gap-3 px-3 py-3 transition hover:bg-slate-50 ${
                item.unread ? 'bg-violet-50/50' : ''
              }`}
            >
              {typeIcon(item.type)}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  {item.unread ? (
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-violet-600" aria-label="Sin leer" />
                  ) : null}
                </div>
                <p className="mt-0.5 text-sm leading-snug text-slate-600">{item.body}</p>
                <p className="mt-1 text-xs text-slate-400">{item.time}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-slate-100 px-3 py-2">
        <Link
          to="/eventos"
          className="block rounded-lg py-2 text-center text-xs font-medium text-indigo-900 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          onClick={onClose}
        >
          Ver eventos
        </Link>
      </div>
    </div>
  );
}

export default NotificationsDropdown;
