import { useEffect } from 'react';

const HEADER_PURPLE = 'bg-[#2D2654]';

function StackedCoinsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="11" r="8" fill="currentColor" opacity="0.35" />
      <circle cx="12" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="12" cy="8" rx="7" ry="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function CoinGlyph({ className = 'h-6 w-6', onDark }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        className={`h-full w-full ${onDark ? 'text-amber-100' : 'text-amber-500'}`}
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <circle cx="12" cy="12" r="7" fill={onDark ? '#FDE68A' : '#FBBF24'} />
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={onDark ? '#F59E0B' : '#D97706'}
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}

const PACKS = [
  {
    id: 'inicial',
    name: 'Pack Inicial',
    headerClass: 'bg-slate-500',
    coins: 500,
    bonus: null,
    price: '$4.99',
    unitLabel: '$1.00 por cada 100 monedas',
    badge: null,
    variant: 'standard',
  },
  {
    id: 'popular',
    name: 'Pack Popular',
    headerClass: 'bg-blue-500',
    coins: 1200,
    bonus: 200,
    price: '$9.99',
    unitLabel: '$0.71 por cada 100 monedas',
    badge: 'MÁS POPULAR',
    variant: 'standard',
    headerIcon: 'sparkle',
  },
  {
    id: 'power',
    name: 'Pack Relámpago',
    headerClass: 'bg-violet-600',
    coins: 2500,
    bonus: 400,
    price: '$17.99',
    unitLabel: '$0.62 por cada 100 monedas',
    badge: null,
    variant: 'premium',
    headerIcon: 'bolt',
  },
  {
    id: 'valor',
    name: 'Pack Élite',
    headerClass: 'bg-orange-500',
    coins: 5000,
    bonus: 1200,
    price: '$29.99',
    unitLabel: '$0.48 por cada 100 monedas',
    badge: 'MEJOR VALOR',
    variant: 'premium',
    headerIcon: 'crown',
  },
];

/**
 * Modal tienda de monedas — se abre desde el botón de coins del header.
 */
function CoinStoreModal({ open, onClose, balance = 1250 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const formattedBalance = balance.toLocaleString('es-AR');

  return (
    <div
      id="coin-store-dialog"
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coin-store-title"
      aria-describedby="coin-store-desc"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/55 backdrop-blur-[2px]"
        aria-label="Cerrar tienda"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl">
        <div className={`flex shrink-0 items-start justify-between gap-3 px-4 pb-4 pt-4 text-white sm:px-5 ${HEADER_PURPLE}`}>
          <div className="flex min-w-0 gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 ring-2 ring-white/25">
              <StackedCoinsIcon className="h-7 w-7 text-white" />
            </span>
            <div className="min-w-0">
              <h2 id="coin-store-title" className="text-lg font-bold leading-tight">
                Tienda de Monedas
              </h2>
              <p id="coin-store-desc" className="mt-1 text-sm text-white/85">
                Compra monedas para desbloquear características premium
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white/90 outline-none ring-white/40 transition hover:bg-white/10 focus-visible:ring-2"
            aria-label="Cerrar"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-5">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Tu balance actual</p>
              <p className="mt-2 flex items-center gap-2 text-2xl font-bold tabular-nums text-indigo-950">
                <CoinGlyph className="h-8 w-8 shrink-0" />
                <span>{formattedBalance}</span>
                <span className="text-base font-semibold text-slate-600">monedas</span>
              </p>
            </div>
            <div className="mt-4 min-w-[12rem] border-t border-slate-200 pt-4 sm:mt-0 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <p className="text-sm font-semibold text-slate-800">¿Qué puedes hacer?</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                <li>Destacar publicaciones</li>
                <li>Badges premium</li>
                <li>Temas personalizados</li>
              </ul>
            </div>
          </div>

          <h3 className="mt-6 text-base font-semibold text-slate-900">Elige tu pack</h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {PACKS.map((pack) => {
              const isPopular = pack.badge === 'MÁS POPULAR';

              if (pack.variant === 'premium') {
                return (
                  <article
                    key={pack.id}
                    className={`relative overflow-hidden rounded-xl border border-slate-200 shadow-sm ${pack.headerClass}`}
                  >
                    {pack.badge ? (
                      <span className="absolute right-3 top-3 rounded bg-black/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        {pack.badge}
                      </span>
                    ) : null}
                    <div className="flex flex-col items-center px-4 pb-5 pt-8 text-white">
                      {pack.headerIcon === 'bolt' ? (
                        <svg className="mb-2 h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71L14.09 12H6.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 011.413.096z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="mb-2 h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 4l2.5 4h5L15 18H9L4.5 8h5L12 4zm0 2.2L10.8 8H6.7l2.5 8h4.6l2.5-8h-4.1L12 6.2z" />
                        </svg>
                      )}
                      <p className="text-center text-lg font-bold">{pack.name}</p>
                      <p className="mt-3 flex items-center gap-1.5 text-2xl font-bold tabular-nums">
                        <CoinGlyph className="h-8 w-8" onDark />
                        {pack.coins.toLocaleString('es-AR')}
                      </p>
                      {pack.bonus ? (
                        <span className="mt-2 rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-semibold">
                          +{pack.bonus} de BONUS
                        </span>
                      ) : null}
                      <p className="mt-4 text-2xl font-bold">{pack.price}</p>
                      <p className="mt-1 text-xs text-white/85">{pack.unitLabel}</p>
                      <button
                        type="button"
                        className="mt-5 w-full rounded-lg bg-[#2D285e] py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#252350] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                      >
                        Comprar ahora
                      </button>
                    </div>
                  </article>
                );
              }

              return (
                <article key={pack.id} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {isPopular ? (
                    <span className="absolute right-2 top-2 z-[1] rounded bg-[#2D285e] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                      MÁS POPULAR
                    </span>
                  ) : null}
                  <div className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white ${pack.headerClass}`}>
                    {pack.headerIcon === 'sparkle' ? (
                      <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeWidth="2" d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                      </svg>
                    ) : (
                      <CoinGlyph className="h-5 w-5 shrink-0" onDark />
                    )}
                    {pack.name}
                  </div>
                  <div className="flex flex-col items-center px-4 pb-5 pt-4">
                    <p className="flex items-center gap-2 text-2xl font-bold tabular-nums text-indigo-950">
                      <CoinGlyph className="h-9 w-9 shrink-0" />
                      {pack.coins.toLocaleString('es-AR')}
                    </p>
                    {pack.bonus ? (
                      <span className="mt-2 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800">
                        +{pack.bonus} de BONUS
                      </span>
                    ) : null}
                    <p className="mt-4 text-2xl font-bold text-slate-900">{pack.price}</p>
                    <p className="mt-1 text-center text-xs text-slate-500">{pack.unitLabel}</p>
                    <button
                      type="button"
                      className="mt-5 w-full rounded-lg bg-[#2D285e] py-2.5 text-sm font-semibold text-white transition hover:bg-[#252350] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                      Comprar ahora
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Pagos seguros simulados — próximamente integración real.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoinStoreModal;
