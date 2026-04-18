const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'hackaton_secret';

const register = async ({ username, email, password, displayName }) => {
  const hashed = await bcrypt.hash(password, 8);
  const user = await User.create({ username, email, password: hashed, displayName });
  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
  return { token, user };
};

const getProfile = async (id) => {
  return User.findById(id).select('-password').populate('followers', 'username displayName avatar').populate('following', 'username displayName avatar');
};

const updateProfile = async (id, data) => {
  const allowed = ['displayName', 'bio', 'avatar'];
  const updates = Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));
  return User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
};

const follow = async (userId, targetId) => {
  if (userId === targetId) throw new Error('Cannot follow yourself');
  await User.findByIdAndUpdate(userId, { $addToSet: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } });
};

const unfollow = async (userId, targetId) => {
  await User.findByIdAndUpdate(userId, { $pull: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $pull: { followers: userId } });
};

const searchUsers = async (query) => {
  return User.find({
    $or: [
      { username: { $regex: query, $options: 'i' } },
      { displayName: { $regex: query, $options: 'i' } },
    ],
  }).select('-password').limit(20);
};

const getLibrary = async (userId) => {
  const user = await User.findById(userId).populate('library', 'name cover categories minPlayers maxPlayers duration complexity');
  return user.library;
};

const addToLibrary = async (userId, gameId) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { library: gameId } });
};

const removeFromLibrary = async (userId, gameId) => {
  await User.findByIdAndUpdate(userId, { $pull: { library: gameId } });
};

module.exports = { register, login, getProfile, updateProfile, follow, unfollow, searchUsers, getLibrary, addToLibrary, removeFromLibrary };
