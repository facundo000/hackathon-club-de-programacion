const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ id: user._id, username: user.username, email: user.email });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName } });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

const logout = (req, res) => {
  // JWT is stateless — client just drops the token
  res.json({ message: 'Logged out' });
};

const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.params.id || req.user.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const follow = async (req, res) => {
  try {
    await authService.follow(req.user.id, req.params.id);
    res.json({ message: 'Followed' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const unfollow = async (req, res) => {
  try {
    await authService.unfollow(req.user.id, req.params.id);
    res.json({ message: 'Unfollowed' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await authService.searchUsers(req.query.q || '');
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getLibrary = async (req, res) => {
  try {
    const library = await authService.getLibrary(req.user.id);
    res.json(library);
  } catch (e) { res.status(500).json({ error: e.message }); }
};

const addToLibrary = async (req, res) => {
  try {
    await authService.addToLibrary(req.user.id, req.params.gameId);
    res.json({ message: 'Game added to library' });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

const removeFromLibrary = async (req, res) => {
  try {
    await authService.removeFromLibrary(req.user.id, req.params.gameId);
    res.json({ message: 'Game removed from library' });
  } catch (e) { res.status(400).json({ error: e.message }); }
};

module.exports = { register, login, logout, getProfile, updateProfile, follow, unfollow, searchUsers, getLibrary, addToLibrary, removeFromLibrary };
