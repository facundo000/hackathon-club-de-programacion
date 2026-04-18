import { useRegisterForm } from '../hooks/useRegisterForm';

export function RegisterForm({ onSwitchToLogin }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    wasSubmitted,
    isEmailValid,
    isPasswordValid,
    passwordsMatch,
    handleSubmit,
  } = useRegisterForm();

  return (
    <>
      <header>
        <h2 className="text-2xl font-bold text-white">Crear cuenta</h2>
        <p className="mt-2 text-sm text-slate-300">
          Registrate para encontrar partidas y hacer match con jugadores.
        </p>
      </header>

      <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="register-email">
            Correo electronico
          </label>
          <input
            id="register-email"
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
          <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="register-password">
            Contrasena
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
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

        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="register-confirm-password"
          >
            Confirmar contrasena
          </label>
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
            placeholder="Repite tu contrasena"
            aria-invalid={wasSubmitted && !passwordsMatch}
          />
          {wasSubmitted && !passwordsMatch ? (
            <p className="mt-2 text-sm text-rose-400">Las contrasenas deben coincidir.</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:bg-violet-500/60"
          disabled={!email && !password && !confirmPassword}
        >
          Crear cuenta
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-300">
        ¿Ya tienes cuenta?{' '}
        <button
          type="button"
          className="font-semibold text-violet-300 hover:text-violet-200"
          onClick={onSwitchToLogin}
        >
          Inicia sesion
        </button>
      </p>
    </>
  );
}
