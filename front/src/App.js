import { useMemo, useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isEmailValid = useMemo(() => {
    if (!email) {
      return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const isPasswordValid = useMemo(() => password.length >= 8, [password]);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (event) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) {
      return;
    }

    // En una siguiente iteracion conectamos este payload al backend.
    // eslint-disable-next-line no-console
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <main className="mx-auto flex w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/80">
        <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-10 lg:flex">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              BoardMatch
            </p>
            <h1 className="text-3xl font-bold leading-tight">
              Tu red social para descubrir y jugar juegos de mesa
            </h1>
            <p className="mt-4 max-w-sm text-sm text-violet-100">
              Conecta con personas de tu zona, crea mesas, y encuentra partidas segun tus gustos.
            </p>
          </div>
          <p className="text-sm text-violet-100/90">
            "Cada partida comienza con una buena conexion."
          </p>
        </section>

        <section className="w-full p-6 sm:p-10 lg:w-1/2">
          <header>
            <h2 className="text-2xl font-bold text-white">Iniciar sesion</h2>
            <p className="mt-2 text-sm text-slate-300">
              Accede para encontrar nuevas partidas y hacer match con jugadores.
            </p>
          </header>

          <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
                Correo electronico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                placeholder="tucorreo@ejemplo.com"
                aria-invalid={wasSubmitted && !isEmailValid}
              />
              {wasSubmitted && !isEmailValid ? (
                <p className="mt-2 text-sm text-rose-400">Ingresa un correo valido.</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                Contrasena
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
                placeholder="Minimo 8 caracteres"
                aria-invalid={wasSubmitted && !isPasswordValid}
              />
              {wasSubmitted && !isPasswordValid ? (
                <p className="mt-2 text-sm text-rose-400">
                  Tu contrasena debe tener al menos 8 caracteres.
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300" htmlFor="rememberMe">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-violet-500 focus:ring-violet-500/50"
                />
                Recordarme
              </label>
              <a className="text-sm font-medium text-violet-300 hover:text-violet-200" href="#recuperar">
                Olvide mi contrasena
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-500/60"
              disabled={!email && !password}
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-300">
            ¿Aun no tienes cuenta?{' '}
            <a className="font-semibold text-violet-300 hover:text-violet-200" href="#registro">
              Registrate
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
