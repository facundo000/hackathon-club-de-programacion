import { useEffect, useState } from 'react';
import { forumsApi, postsApi } from '../api';

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return 'hace un momento';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return `hace ${Math.floor(diff / 86400)}d`;
}

function PostCard({ post }) {
  const authorName = post.author?.displayName || post.author?.username || 'Usuario';
  const initials = authorName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-slate-900">{authorName}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">{timeAgo(post.createdAt)}</span>
            {post.forum?.name ? (
              <>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-medium text-violet-600">{post.forum.name}</span>
              </>
            ) : null}
          </div>
          <h3 className="mt-1 text-sm font-semibold text-slate-800">{post.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{post.content}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
        <button type="button" className="flex items-center gap-1.5 transition hover:text-violet-600">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 11l5-5 5 5M12 6v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {post.upvoteCount ?? 0}
        </button>
        <button type="button" className="flex items-center gap-1.5 transition hover:text-violet-600">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {post.commentCount ?? 0}
        </button>
      </div>
    </article>
  );
}

function PostFeed({ forumId, authorId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = forumId
      ? forumsApi.getPosts(forumId).then((data) => Array.isArray(data) ? data : [])
      : postsApi.getFeed(1, authorId).then((data) => data.posts ?? []);

    fetch
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [forumId, authorId]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
        Cargando posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No hay posts en tu feed todavía.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
