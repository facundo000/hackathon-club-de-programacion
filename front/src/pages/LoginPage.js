function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <main className="mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/80">
        <h1 className="text-2xl font-bold text-white">Iniciar sesion</h1>
        <p className="mt-2 text-sm text-slate-300">Ingresa para acceder a BoardGame Social.</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-200" htmlFor="email">
              Correo electronico
            </label>
            <input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-200" htmlFor="password">
              Contrasena
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
