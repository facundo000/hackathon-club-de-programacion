function ThumbUpIcon({ className }) {
  /* Feather / Lucide-style thumbs-up: un solo trazo cerrado, se ve bien a 20–24px */
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

/**
 * Carta de publicacion — mismo estilo visual que LeftSidebar / RightSidebar.
 */
function PostCard({
  forumName,
  authorName,
  timeAgo,
  content,
  imageSrc,
  imageAlt = '',
  upvoteCount,
  upvoted = false,
  onUpvote,
}) {
  const showImage = Boolean(imageSrc);
  const footerInteractive = typeof onUpvote === 'function';

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{forumName}</p>
        <h2 className="mt-1 text-base font-semibold leading-tight text-slate-900">{authorName}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{timeAgo}</p>

        <div className="mt-3 text-sm leading-relaxed text-slate-800">
          {content}
        </div>
      </div>

      {showImage ? (
        <div className="border-t border-slate-100">
          <img
            src={imageSrc}
            alt={imageAlt || `Imagen de la publicacion de ${authorName}`}
            className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
          />
        </div>
      ) : null}

      <footer className="flex items-center gap-3 border-t border-slate-100 px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={onUpvote}
          disabled={!footerInteractive}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
            footerInteractive
              ? 'cursor-pointer text-slate-700 hover:bg-slate-50 hover:text-indigo-950'
              : 'cursor-default text-slate-700'
          } ${upvoted ? 'text-indigo-950' : ''}`}
          aria-pressed={footerInteractive ? upvoted : undefined}
          aria-label={footerInteractive ? 'Me gusta' : undefined}
        >
          <ThumbUpIcon className="h-5 w-5 shrink-0" />
          {typeof upvoteCount === 'number' ? (
            <span className="font-medium tabular-nums">{upvoteCount}</span>
          ) : null}
        </button>
      </footer>
    </article>
  );
}

export default PostCard;
