import { useLoginForm } from '../hooks/useLoginForm';

export function LoginForm({ onSwitchToRegister }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    wasSubmitted,
    isEmailValid,
    isPasswordValid,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      <header>
        <h2 className="text-2xl font-bold text-white">Iniciar sesion</h2>
        <p className="mt-2 text-sm text-slate-300">
          Accede para encontrar nuevas partidas y hacer match con jugadores.
        </p>
      </header>

      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="login-email">
            Correo electronico
          </label>
          <input
            id="login-email"
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
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="login-password">
            Contrasena
          </label>
          <input
            id="login-password"
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
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300" htmlFor="login-rememberMe">
            <input
              id="login-rememberMe"
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
        <button
          type="button"
          className="font-semibold text-violet-300 hover:text-violet-200"
          onClick={onSwitchToRegister}
        >
          Registrate
        </button>
      </p>
    </>
  );
}
