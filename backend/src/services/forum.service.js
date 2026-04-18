const Forum = require('../models/Forum');
const Post = require('../models/Post');

const create = async (userId, data) => {
  const forum = await Forum.create({ ...data, creator: userId, members: [userId] });
  return forum;
};

const getAll = async () => {
  return Forum.find().populate('creator', 'username avatar').select('-members');
};

const getById = async (id) => {
  return Forum.findById(id).populate('creator', 'username avatar');
};

const join = async (userId, forumId) => {
  await Forum.findByIdAndUpdate(forumId, { $addToSet: { members: userId } });
};

const leave = async (userId, forumId) => {
  await Forum.findByIdAndUpdate(forumId, { $pull: { members: userId } });
};

const getPostsByForum = async (forumId, page = 1) => {
  const limit = 20;
  return Post.find({ forum: forumId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'username avatar')
    .populate('forum', 'name');
};

module.exports = { create, getAll, getById, join, leave, getPostsByForum };
