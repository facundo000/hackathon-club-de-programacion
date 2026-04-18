import { useEffect, useState } from 'react';
import { forumsApi, postsApi } from '../api';
import { useAuth } from '../context/AuthContext';

function PostComposer({ onPost }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [forumId, setForumId] = useState('');
  const [forums, setForums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initials = user?.displayName
    ? user.displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.username?.slice(0, 2).toUpperCase() ?? '?';

  useEffect(() => {
    forumsApi.getAll().then((data) => {
      setForums(data);
      if (data.length > 0) setForumId(data[0]._id);
    }).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !forumId) return;
    setIsLoading(true);
    setError('');
    try {
      await postsApi.create({ forumId, title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
      onPost?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Crear publicacion">
      <div className="flex items-start gap-3">
        <span className="mt-1 grid h-10 w-10 flex-none place-items-center rounded-lg bg-fuchsia-100 text-sm font-bold text-fuchsia-700">
          {initials}
        </span>
        <div className="w-full space-y-2">
          <input
            type="text"
            placeholder="Título de tu publicación"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
          />
          <textarea
            rows={2}
            placeholder="¿Que juego has jugado hoy?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>
      </div>

      {error ? <p className="mt-2 text-xs text-rose-500">{error}</p> : null}

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={forumId}
          onChange={(e) => setForumId(e.target.value)}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
        >
          {forums.map((f) => (
            <option key={f._id} value={f._id}>{f.name}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !title.trim() || !content.trim()}
          className="w-full rounded-lg bg-indigo-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-900 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:w-auto"
        >
          {isLoading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </section>
  );
}

export default PostComposer;
