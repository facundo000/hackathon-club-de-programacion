import { useEffect, useState } from 'react';

function ProfileEditModal({ open, initialProfile, onClose, onSave }) {
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [favoritesText, setFavoritesText] = useState('');
  const [myGamesText, setMyGamesText] = useState('');

  useEffect(() => {
    if (!open) return;
    setName(initialProfile.name);
    setLocality(initialProfile.locality);
    setImageUrl(initialProfile.imageUrl);
    setFavoritesText(initialProfile.favoriteGames.map((g) => g.title).join('\n'));
    setMyGamesText(initialProfile.myGames.map((g) => g.title).join('\n'));
  }, [open, initialProfile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const favTitles = favoritesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const myTitles = myGamesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      locality: locality.trim(),
      imageUrl: imageUrl.trim(),
      favoriteGames: favTitles.map((title, i) => ({
        id: `f-${i}-${title.slice(0, 8)}`,
        title,
        note: '',
      })),
      myGames: myTitles.map((title, i) => ({
        id: `m-${i}-${title.slice(0, 8)}`,
        title,
        acquired: '',
      })),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="profile-edit-title">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-200 bg-white shadow-xl sm:rounded-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 id="profile-edit-title" className="text-lg font-semibold text-slate-900">
            Editar perfil
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Los cambios se guardan solo en esta sesión (demo sin API).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-name">
              Nombre
            </label>
            <input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-locality">
              Localidad
            </label>
            <input
              id="edit-locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-image">
              URL de la imagen de perfil
            </label>
            <input
              id="edit-image"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-favorites">
              Juegos favoritos (uno por línea)
            </label>
            <textarea
              id="edit-favorites"
              rows={4}
              value={favoritesText}
              onChange={(e) => setFavoritesText(e.target.value)}
              className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="edit-mygames">
              Mis juegos (uno por línea)
            </label>
            <textarea
              id="edit-mygames"
              rows={4}
              value={myGamesText}
              onChange={(e) => setMyGamesText(e.target.value)}
              className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30"
            />
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
