const BASE_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error del servidor');
  return data;
};

export const authApi = {
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
};

export const postsApi = {
  getFeed: (page = 1, authorId) => {
    const params = new URLSearchParams({ page });
    if (authorId) params.set('authorId', authorId);
    return request(`/posts/feed?${params}`);
  },
  create: (body) => request('/posts', { method: 'POST', body: JSON.stringify(body) }),
};

export const statsApi = {
  getMyStats: () => request('/stats/me'),
};

export const forumsApi = {
  getAll: () => request('/forums'),
  getPosts: (forumId, page = 1) => request(`/forums/${forumId}/posts?page=${page}`),
};

export const eventsApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/events${qs ? `?${qs}` : ''}`);
  },
};
