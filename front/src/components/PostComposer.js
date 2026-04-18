function PostComposer() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Crear publicacion">
      <div className="flex items-start gap-3">
        <span className="mt-1 grid h-10 w-10 flex-none place-items-center rounded-lg bg-fuchsia-100 text-sm font-bold text-fuchsia-700">
          JP
        </span>
        <div className="w-full">
          <label className="sr-only" htmlFor="post-content">
            ¿Que juego has jugado hoy?
          </label>
          <textarea
            id="post-content"
            rows={2}
            placeholder="¿Que juego has jugado hoy?"
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            className="rounded-md px-2 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Foto
          </button>
          <button
            type="button"
            className="rounded-md px-2 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Sentimiento
          </button>
          <button
            type="button"
            className="rounded-md px-2 py-1 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Ubicacion
          </button>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-indigo-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:w-auto"
        >
          Publicar
        </button>
      </div>
    </section>
  );
}

export default PostComposer;
